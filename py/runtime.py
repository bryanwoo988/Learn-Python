"""Runs and grades learner code. Shared by the browser worker and the Node checks.

Every call gets a fresh namespace and a freshly reset working folder, so one run
can never affect the next. The JS side calls run_json / grade_json with a JSON
payload and gets JSON back.
"""
import base64
import builtins
import copy
import io
import json
import math
import os
import shutil
import sys
import traceback
import warnings

os.environ.setdefault('MPLBACKEND', 'agg')
WORK = '/home/pyodide/work'
LEARNER = '<learner>'
MAX_LINES = 2000
MAX_CHARS = 100_000


class OutputLimit(BaseException):
    """Raised when a run prints too much. BaseException, so `except Exception` cannot swallow it."""


class CappedStdout(io.TextIOBase):
    def __init__(self):
        self.parts, self.chars, self.lines = [], 0, 0

    def writable(self):
        return True

    def write(self, s):
        self.parts.append(s)
        self.chars += len(s)
        self.lines += s.count('\n')
        if self.chars > MAX_CHARS or self.lines > MAX_LINES:
            raise OutputLimit()
        return len(s)

    def value(self):
        return ''.join(self.parts)


# ---------------------------------------------------------------- running

def _reset_files(files):
    os.chdir('/')  # the folder cannot be removed while we are inside it
    shutil.rmtree(WORK, ignore_errors=True)
    os.makedirs(WORK, exist_ok=True)
    os.chdir(WORK)
    for name, text in (files or {}).items():
        with open(name, 'w', encoding='utf-8') as f:
            f.write(text)


def _close_figures():
    if 'matplotlib.pyplot' in sys.modules:
        sys.modules['matplotlib.pyplot'].close('all')


def _figure_images():
    if 'matplotlib.pyplot' not in sys.modules:
        return []
    plt = sys.modules['matplotlib.pyplot']
    out = []
    for num in plt.get_fignums():
        buf = io.BytesIO()
        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            plt.figure(num).savefig(buf, format='png', dpi=90, bbox_inches='tight')
        out.append(base64.b64encode(buf.getvalue()).decode('ascii'))
    return out


def _error_info(exc, code):
    """Exception → {type, msg, line, tb} showing only the learner's own lines."""
    lines = code.split('\n')
    name = type(exc).__name__
    if isinstance(exc, OutputLimit):
        return {'type': 'OutputLimit', 'msg': '', 'line': None, 'tb': ''}
    if isinstance(exc, SyntaxError) and exc.filename == LEARNER:
        msg = exc.msg
        tb = f'  Line {exc.lineno}\n    {(exc.text or "").rstrip()}\n{name}: {msg}'
        return {'type': name, 'msg': msg, 'line': exc.lineno, 'tb': tb}
    frames = [f for f in traceback.extract_tb(exc.__traceback__) if f.filename == LEARNER]
    msg = str(exc)
    out = ['Traceback (most recent call last):']
    for f in frames:
        where = '' if f.name == '<module>' else f', in {f.name}'
        out.append(f'  Line {f.lineno}{where}')
        if 0 < f.lineno <= len(lines):
            out.append('    ' + lines[f.lineno - 1].strip())
    out.append(f'{name}: {msg}' if msg else name)
    return {'type': name, 'msg': msg, 'line': frames[-1].lineno if frames else None, 'tb': '\n'.join(out)}


def _execute(code, setup='', files=None, stdin=None):
    """Runs setup then code in a fresh namespace. Returns (ns, stdout, error)."""
    _reset_files(files)
    _close_figures()
    ns = {'__name__': '__main__', '__builtins__': builtins}
    queue = list(stdin or [])
    out = CappedStdout()

    def fake_input(prompt=''):
        out.write(str(prompt))
        if not queue:
            raise EOFError('EOF when reading a line (no more input lines)')
        value = queue.pop(0)
        out.write(value + '\n')
        return value

    ns['input'] = fake_input
    real_out, real_err = sys.stdout, sys.stderr
    sys.stdout = sys.stderr = out
    error = None
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            if setup:
                exec(compile(setup, '<setup>', 'exec'), ns)
            exec(compile(code, LEARNER, 'exec'), ns)
    except BaseException as e:  # noqa: BLE001 — every learner error is reported, never raised
        if isinstance(e, KeyboardInterrupt):
            raise
        error = _error_info(e, code)
    finally:
        sys.stdout, sys.stderr = real_out, real_err
    return ns, out.value(), error


def run(code, setup='', files=None, stdin=None):
    ns, stdout, error = _execute(code, setup, files, stdin)
    try:
        images = _figure_images()
    except Exception:  # a broken figure must not hide the output
        images = []
    return {'stdout': stdout, 'error': error, 'images': images}


# ---------------------------------------------------------------- comparing

TOL = 1e-6


def _is_num(x):
    return isinstance(x, (int, float)) and not isinstance(x, bool) or type(x).__module__ == 'numpy' and hasattr(x, 'dtype') and x.shape == () and x.dtype.kind in 'iuf'


def _num_same(a, b):
    a, b = float(a), float(b)
    if math.isnan(a) and math.isnan(b):
        return True
    return math.isclose(a, b, rel_tol=TOL, abs_tol=TOL)


def _frame_rows(df, ordered):
    """DataFrame → (columns, rows). An unnamed integer index (left over from filtering) is dropped;
    any other index (e.g. groupby keys) becomes a column, so keys are compared too."""
    import pandas as pd
    if isinstance(df, pd.Series):
        df = df.to_frame(name=df.name if df.name is not None else 0)
    idx = df.index
    if not isinstance(idx, pd.MultiIndex) and idx.name is None and idx.dtype.kind in 'iu':
        df = df.reset_index(drop=True)
    else:
        df = df.reset_index()
    cols = [str(c) for c in df.columns]
    rows = [tuple(None if (v is None or (isinstance(v, float) and math.isnan(v))) else (v.item() if hasattr(v, 'item') else v) for v in r)
            for r in df.itertuples(index=False, name=None)]
    if not ordered:
        rows.sort(key=lambda r: tuple((0, round(float(v), 6)) if _is_num(v) else (1, repr(v)) for v in r))
    return cols, rows


def same(a, b, ordered=True):
    if a is None or b is None:
        return a is b
    if isinstance(a, bool) or isinstance(b, bool):
        return isinstance(a, bool) and isinstance(b, bool) and a == b
    if _is_num(a) and _is_num(b):
        return _num_same(a, b)
    mod_a, mod_b = type(a).__module__, type(b).__module__
    if mod_a.startswith('pandas') or mod_b.startswith('pandas'):
        import pandas as pd
        if not (isinstance(a, (pd.DataFrame, pd.Series)) and isinstance(b, (pd.DataFrame, pd.Series))):
            return False
        if isinstance(a, pd.DataFrame) != isinstance(b, pd.DataFrame):
            return False
        ca, ra = _frame_rows(a, ordered)
        cb, rb = _frame_rows(b, ordered)
        return ca == cb and len(ra) == len(rb) and all(same(x, y) for x, y in zip(ra, rb))
    if mod_a == 'numpy' or mod_b == 'numpy':
        if not (hasattr(a, 'shape') and hasattr(b, 'shape')) or a.shape != b.shape:
            return False
        return same(a.tolist(), b.tolist())
    if type(a) is not type(b) and not (isinstance(a, str) and isinstance(b, str)):
        return False
    if isinstance(a, (list, tuple)):
        return len(a) == len(b) and all(same(x, y) for x, y in zip(a, b))
    if isinstance(a, (set, frozenset)):
        if len(a) != len(b):
            return False
        rest = list(b)
        for x in a:
            hit = next((i for i, y in enumerate(rest) if same(x, y)), None)
            if hit is None:
                return False
            rest.pop(hit)
        return True
    if isinstance(a, dict):
        return set(a) == set(b) and all(same(a[k], b[k]) for k in a)
    try:
        return bool(a == b)
    except Exception:
        return False


def _norm_lines(text):
    lines = [ln.rstrip() for ln in text.replace('\r\n', '\n').split('\n')]
    while lines and not lines[-1]:
        lines.pop()
    return lines


def _float(tok):
    try:
        return float(tok)
    except ValueError:
        return None


def same_stdout(got, exp):
    g, e = _norm_lines(got), _norm_lines(exp)
    if len(g) != len(e):
        return False
    for lg, le in zip(g, e):
        if lg == le:
            continue
        tg, te = lg.split(), le.split()
        if len(tg) != len(te):
            return False
        for x, y in zip(tg, te):
            if x != y and not (_float(x) is not None and _float(y) is not None and _num_same(_float(x), _float(y))):
                return False
    return True


def figure_summary():
    if 'matplotlib.pyplot' not in sys.modules:
        return []
    plt = sys.modules['matplotlib.pyplot']
    out = []
    for num in plt.get_fignums():
        for ax in plt.figure(num).get_axes():
            r = lambda vs: [round(float(v), 6) for v in vs]
            out.append({
                'title': ax.get_title().strip().lower(),
                'xlabel': ax.get_xlabel().strip().lower(),
                'ylabel': ax.get_ylabel().strip().lower(),
                'lines': [r(ln.get_ydata()) for ln in ax.get_lines()],
                'bars': [r(p.get_height() for p in c.patches) for c in ax.containers],
                'points': [sorted(map(tuple, (pt for pt in c.get_offsets().tolist()))) for c in ax.collections if hasattr(c, 'get_offsets') and len(c.get_offsets())],
            })
    return out


# ---------------------------------------------------------------- grading

def _shown(v):
    s = repr(v)
    return s if len(s) <= 2000 else s[:2000] + ' …'


def _call_text(name, args):
    return f"{name}({', '.join(repr(a) for a in args)})"


def grade(code, solution, check, setup='', cases=None, files=None, stdin=None):
    """Runs solution and learner under every case; stops at the first difference.
    Case 0 is public, later cases are hidden tests.

    The eval() calls below evaluate check expressions written in the app's own
    problem files, against the learner's namespace, inside the learner's own
    browser sandbox: running the learner's code is the point of this module."""
    kind = check.get('type', 'stdout')
    ordered = check.get('ordered', False)
    cases = cases or ['']
    calls = check.get('calls') or [[]]
    n = len(calls) if kind == 'function' else len(cases)
    first = None
    for i in range(n):
        case_setup = setup + '\n' + (cases[i] if kind != 'function' else cases[0])
        sol_ns, sol_out, sol_err = _execute(solution, case_setup, files, stdin)
        if sol_err:
            raise RuntimeError(f'reference solution failed: {sol_err["tb"]}')
        sol_fig = figure_summary() if kind == 'figure' else None
        ns, out, err = _execute(code, case_setup, files, stdin)
        res = {'ok': False, 'case': i, 'hidden': i > 0, 'stdout': out, 'error': err, 'reason': '', 'got': '', 'exp': '', 'assert': None}
        if i == 0:
            res['images'] = _figure_images()
            first = res
        if err:
            res['reason'] = 'error'
            return res
        if kind == 'stdout':
            if not same_stdout(out, sol_out):
                res.update(reason='stdout', got=out, exp=sol_out)
                return res
        elif kind == 'function':
            name = check['name']
            if not callable(ns.get(name)):
                res.update(reason='missing', got=name)
                return res
            args = calls[i]
            exp = sol_ns[name](*copy.deepcopy(args))
            got_ns, got_out, got_err = ns, None, None
            real_out = sys.stdout
            sys.stdout = CappedStdout()
            try:
                got = got_ns[name](*copy.deepcopy(args))
            except BaseException as e:  # noqa: BLE001
                if isinstance(e, KeyboardInterrupt):
                    raise
                got_err = _error_info(e, code)
            finally:
                sys.stdout = real_out
            if got_err:
                res.update(reason='error', error=got_err, got=_call_text(name, args))
                return res
            if not same(got, exp, ordered=True):
                res.update(reason='return', got=f'{_call_text(name, args)} → {_shown(got)}', exp=f'{_call_text(name, args)} → {_shown(exp)}')
                return res
        elif kind == 'values':
            for expr in check['exprs']:
                try:
                    got = eval(expr, ns)
                except NameError:
                    res.update(reason='missing', got=expr)
                    return res
                except BaseException as e:  # noqa: BLE001
                    res.update(reason='error', error=_error_info(e, code))
                    return res
                exp = eval(expr, sol_ns)
                if not same(got, exp, ordered=ordered):
                    res.update(reason='value', got=f'{expr} = {_shown(got)}', exp=f'{expr} = {_shown(exp)}')
                    return res
        elif kind == 'figure':
            got = figure_summary()
            if not got or not same(got, sol_fig):
                res.update(reason='figure', got=json.dumps(got)[:2000], exp=json.dumps(sol_fig)[:2000])
                return res
        for k, a in enumerate(check.get('asserts') or []):
            try:
                ok = bool(eval(a['expr'], ns))
            except BaseException:  # noqa: BLE001
                ok = False
            if not ok:
                res.update(reason='assert', **{'assert': k})
                return res
    first.update(ok=True, reason='', got='', exp='')
    return first


# ---------------------------------------------------------------- JSON entry points

def run_json(payload):
    p = json.loads(payload)
    return json.dumps(run(p['code'], p.get('setup') or '', p.get('files'), p.get('stdin')))


def grade_json(payload):
    p = json.loads(payload)
    return json.dumps(grade(p['code'], p['solution'], p.get('check') or {}, p.get('setup') or '', p.get('cases'), p.get('files'), p.get('stdin')))
