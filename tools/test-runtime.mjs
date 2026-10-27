// Tests for py/runtime.py (running, grading, figures, error cleanup). Run: node tools/test-runtime.mjs
import { createPy } from './node-py.mjs';

const py = await createPy();
let failed = 0, passed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.log('  ✗ ' + name + '\n      ' + (e.message || e)); }
}
function eq(a, b) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); }

await test('run prints', async () => eq((await py.run({ code: 'print(1+1)' })).stdout, '2\n'));
await test('NameError reports type and learner line', async () => {
  const r = await py.run({ code: 'a = 1\nprint(x)' });
  eq([r.error.type, r.error.line], ['NameError', 2]);
  if (/runtime\.py|<setup>|File "/.test(r.error.tb)) throw new Error('traceback leaks internals: ' + r.error.tb);
});
await test('SyntaxError has learner line', async () => eq((await py.run({ code: 'x = 1\nif x\n  print(x)' })).error.line, 2));
await test('output cap stops runaway printing', async () => eq((await py.run({ code: 'for i in range(10**6): print(i)' })).error.type, 'OutputLimit'));
await test('output cap is not caught by except Exception', async () =>
  eq((await py.run({ code: 'try:\n    while True: print(1)\nexcept Exception:\n    print("caught")' })).error.type, 'OutputLimit'));
await test('fresh namespace each run', async () => {
  await py.run({ code: 'print = 3' });
  eq((await py.run({ code: 'print("ok")' })).stdout, 'ok\n');
});
await test('files reset each run', async () => {
  await py.run({ code: 'open("a.txt","w").write("z")', files: { 'a.txt': 'y' } });
  eq((await py.run({ code: 'print(open("a.txt").read())', files: { 'a.txt': 'y' } })).stdout, 'y\n');
});
await test('input() reads stdin lines and echoes them', async () =>
  eq((await py.run({ code: 'a = input("A? ")\nb = input()\nprint(a + b)', stdin: ['x', 'y'] })).stdout, 'A? x\ny\nxy\n'));
await test('input() with no more lines raises EOFError', async () => eq((await py.run({ code: 'input()' })).error.type, 'EOFError'));
await test('setup variables are visible', async () => eq((await py.run({ code: 'print(n * 2)', setup: 'n = 21' })).stdout, '42\n'));

await test('grade stdout: float noise and trailing whitespace ok', async () => {
  eq((await py.grade({ code: 'print(0.1+0.2)', solution: 'print(0.3)', check: { type: 'stdout' } })).ok, true);
  eq((await py.grade({ code: 'print("a  ")\nprint()', solution: 'print("a")', check: { type: 'stdout' } })).ok, true);
});
await test('grade stdout: wrong text fails with reason stdout', async () => {
  const r = await py.grade({ code: 'print("b")', solution: 'print("a")', check: { type: 'stdout' } });
  eq([r.ok, r.reason, r.got, r.exp], [false, 'stdout', 'b\n', 'a\n']);
});
await test('grade stdout: hidden case reported as hidden', async () => {
  const r = await py.grade({ code: 'print(6)', solution: 'print(n * 2)', setup: '', cases: ['n = 3', 'n = 5'], check: { type: 'stdout' } });
  eq([r.ok, r.case, r.hidden], [false, 1, true]);
});
await test('grade function: hidden call fails', async () => {
  const r = await py.grade({ code: 'def sq(x):\n    return 4 if x == 2 else 0', solution: 'def sq(x):\n    return x * x', check: { type: 'function', name: 'sq', calls: [[2], [3]] } });
  eq([r.ok, r.case, r.hidden, r.reason], [false, 1, true, 'return']);
});
await test('grade function: missing function', async () =>
  eq((await py.grade({ code: 'x = 1', solution: 'def f():\n    return 1', check: { type: 'function', name: 'f', calls: [[]] } })).reason, 'missing'));
await test('grade function: list vs tuple differ', async () =>
  eq((await py.grade({ code: 'def f():\n    return (1, 2)', solution: 'def f():\n    return [1, 2]', check: { type: 'function', name: 'f', calls: [[]] } })).ok, false));
await test('grade function: arguments are not shared between runs', async () =>
  eq((await py.grade({ code: 'def f(a):\n    a.append(9)\n    return len(a)', solution: 'def f(a):\n    a.append(9)\n    return len(a)', check: { type: 'function', name: 'f', calls: [[[1]]] } })).ok, true));
await test('grade values: dict order does not matter', async () =>
  eq((await py.grade({ code: 'd = {"b": 2, "a": 1}', solution: 'd = {"a": 1, "b": 2}', check: { type: 'values', exprs: ['d'] } })).ok, true));
await test('grade values: DataFrame filtered index vs reset index ok when unordered', async () => {
  const setup = 'import pandas as pd\ndf = pd.DataFrame({"n": [1, 5, 2, 7]})';
  eq((await py.grade({ setup, code: 'r = df[df.n > 3]', solution: 'r = df[df.n > 3].reset_index(drop=True).sort_values("n", ascending=False)', check: { type: 'values', exprs: ['r'] } })).ok, true);
  eq((await py.grade({ setup, code: 'r = df[df.n > 3]', solution: 'r = df[df.n > 3].sort_values("n", ascending=False)', check: { type: 'values', exprs: ['r'], ordered: true } })).ok, false);
});
await test('grade values: groupby keys are compared', async () => {
  const setup = 'import pandas as pd\ndf = pd.DataFrame({"c": ["x", "y", "x"], "v": [1, 2, 3]})';
  eq((await py.grade({ setup, code: 'r = df.groupby("c")["v"].max()', solution: 'r = df.groupby("c")["v"].sum()', check: { type: 'values', exprs: ['r'] } })).ok, false);
  eq((await py.grade({ setup, code: 'r = df.groupby("c")["v"].sum()', solution: 'r = df.groupby("c")["v"].sum()', check: { type: 'values', exprs: ['r'] } })).ok, true);
});
await test('grade values: Counter accepted where a dict is expected', async () =>
  eq((await py.grade({ code: 'from collections import Counter\nc = Counter("aab")', solution: 'c = {"a": 2, "b": 1}', check: { type: 'values', exprs: ['c'] } })).ok, true));
await test('grade asserts: failing assert reports its index', async () => {
  const r = await py.grade({ code: 'x = 1', solution: 'x = 1', check: { type: 'values', exprs: ['x'], asserts: [{ expr: 'x > 0' }, { expr: 'x > 5' }] } });
  eq([r.ok, r.reason, r.assert], [false, 'assert', 1]);
});
await test('grade figure: different bar heights fail', async () => {
  const setup = 'import matplotlib.pyplot as plt';
  const r = await py.grade({ setup, code: 'plt.bar(["a","b"], [1, 3])\nplt.title("T")', solution: 'plt.bar(["a","b"], [1, 2])\nplt.title("T")', check: { type: 'figure' } });
  eq([r.ok, r.reason], [false, 'figure']);
  eq((await py.grade({ setup, code: 'plt.bar(["a","b"], [1, 2])\nplt.title("T")', solution: 'plt.bar(["a","b"], [1, 2])\nplt.title("T")', check: { type: 'figure' } })).ok, true);
});
await test('run returns figure images', async () => {
  const r = await py.run({ code: 'import matplotlib.pyplot as plt\nplt.plot([1, 2])' });
  if (r.images.length !== 1 || !r.images[0].startsWith('iVBOR')) throw new Error('no PNG: ' + JSON.stringify(r).slice(0, 200));
});
await test('grade: learner error reported with reason error', async () => {
  const r = await py.grade({ code: '1/0', solution: 'print(1)', check: { type: 'stdout' } });
  eq([r.ok, r.reason, r.error.type], [false, 'error', 'ZeroDivisionError']);
});

console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
