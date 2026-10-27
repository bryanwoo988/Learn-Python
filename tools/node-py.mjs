// Loads the app's Python runtime (vendor/pyodide + py/runtime.py) in Node, for the tools/ checks.
import { readFileSync } from 'node:fs';
import { loadPyodide } from '../vendor/pyodide/pyodide.mjs';

const root = new URL('..', import.meta.url).pathname;

export async function createPy() {
  const py = await loadPyodide({ indexURL: root + 'vendor/pyodide/' });
  py.runPython(readFileSync(root + 'py/runtime.py', 'utf8'));
  const call = async (fn, payload) => {
    await py.loadPackagesFromImports([payload.setup, payload.code, payload.solution].concat(payload.cases || []).filter(Boolean).join('\n'), { messageCallback: () => {} });
    return JSON.parse(py.globals.get(fn)(JSON.stringify(payload)));
  };
  return { run: p => call('run_json', p), grade: p => call('grade_json', p) };
}

// CSV and text files under data/, as the app passes them to Python.
export function dataFiles(names) {
  return Object.fromEntries((names || []).map(n => [n, readFileSync(root + 'data/' + n, 'utf8')]));
}
