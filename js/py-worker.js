/* Python worker: Pyodide runs here, off the page's thread, so a long or endless
   run never freezes the page. js/engine.js stops a run by terminating this
   worker and starting a fresh one.
   In:  { id, op: 'init' | 'load' | 'run' | 'grade', payload }
   Out: { id, op: 'started' } when the learner's code starts (the timeout starts here),
        { id, op: 'done', result } or { id, op: 'fail', message }. */
import { loadPyodide } from '../vendor/pyodide/pyodide.mjs';

const base = new URL('../', import.meta.url);
const PACK = ['numpy', 'pandas', 'matplotlib', 'scikit-learn', 'scipy'];
let py = null;
const ready = (async () => {
  py = await loadPyodide({ indexURL: new URL('vendor/pyodide/', base).href });
  py.runPython(await (await fetch(new URL('py/runtime.py', base))).text());
})();

async function loadImports(payload) {
  const src = [payload.setup, payload.code, payload.solution].concat(payload.cases || []).filter(Boolean).join('\n');
  try { await py.loadPackagesFromImports(src, { messageCallback: () => {} }); }
  catch (e) {
    // A syntax error in the learner's code is reported by the run itself; anything else is a download problem.
    if (!/SyntaxError/.test(String(e))) throw e;
  }
}

self.onmessage = async e => {
  const { id, op, payload } = e.data;
  try {
    await ready;
    if (op === 'load') await py.loadPackage(PACK, { messageCallback: () => {} });
    if (op === 'run' || op === 'grade') {
      await loadImports(payload);
      self.postMessage({ id, op: 'started' });
      const result = JSON.parse(py.globals.get(op + '_json')(JSON.stringify(payload)));
      self.postMessage({ id, op: 'done', result });
      return;
    }
    self.postMessage({ id, op: 'done', result: null });
  } catch (err) {
    self.postMessage({ id, op: 'fail', message: String((err && err.message) || err) });
  }
};
