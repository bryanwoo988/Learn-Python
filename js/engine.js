/* Talks to the Python worker (js/py-worker.js) and manages the data pack.
   window.PyEngine:
     ready()                       resolves once Python has started
     run(payload, timeoutMs)       → { stdout, error, images }
     grade(payload, timeoutMs)     → runtime.grade result
     stop()                        ends the current run (worker is replaced)
     busy()                        true while code runs
     needsPack(code)               code imports numpy / pandas / matplotlib / sklearn / scipy
     packState()                   'ready' | 'none'
     downloadPack(onProgress)      fetches every data-pack wheel once (the service worker keeps them)
   A run that times out or is stopped resolves with error.type 'Timeout' / 'Stopped'. */
(function () {
  'use strict';
  const PKGS_CACHE = 'py-syntax-pkgs-314.0.7';
  const PACK_RE = /^\s*(?:import|from)\s+(numpy|pandas|matplotlib|sklearn|scipy)\b/m;
  let worker = null, seq = 0, readyP = null, running = 0;
  const pending = new Map();

  function spawn() {
    worker = new Worker('js/py-worker.js', { type: 'module' });
    worker.onmessage = e => {
      const { id, op, result, message } = e.data;
      const job = pending.get(id);
      if (!job) return;
      if (op === 'started') { if (job.timeout) job.timer = setTimeout(() => kill('Timeout'), job.timeout); return; }
      pending.delete(id);
      clearTimeout(job.timer);
      if (job.counts) running--;
      op === 'done' ? job.resolve(result) : job.reject(new Error(message));
    };
    worker.onerror = e => { e.preventDefault(); failAll(new Error(e.message || 'Python worker failed to start')); };
    readyP = call('init');
    readyP.catch(() => {}); // a kill during start-up is reported to whoever awaits the new worker
  }

  function call(op, payload, timeout) {
    const id = ++seq;
    const counts = op === 'run' || op === 'grade';
    if (counts) running++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject, timeout, counts, timer: null });
      worker.postMessage({ id, op, payload });
    });
  }

  function failAll(err) {
    for (const job of pending.values()) { clearTimeout(job.timer); job.reject(err); }
    pending.clear();
    running = 0;
  }

  // Ends every job: runs resolve with a Timeout/Stopped error, other jobs are rejected.
  function kill(type) {
    worker.terminate();
    for (const job of pending.values()) {
      clearTimeout(job.timer);
      if (job.counts) job.resolve({ stdout: '', images: [], error: { type, msg: '', line: null, tb: '' }, ok: false, reason: 'error' });
      else job.reject(new Error(type));
    }
    pending.clear();
    running = 0;
    spawn();
  }

  const packFiles = () => fetch('vendor/pyodide/pack.json').then(r => r.json());
  const packUrl = name => new URL('vendor/pyodide/' + name, location.href);
  const FLAG = 'pysyntax.packDone';

  async function packState() {
    const pack = await packFiles();
    if (window.caches && navigator.serviceWorker && navigator.serviceWorker.controller) {
      const cache = await caches.open(PKGS_CACHE);
      for (const f of pack.files) if (!(await cache.match(packUrl(f.name).pathname))) return 'none';
      return 'ready';
    }
    // No service worker (first visit before it took over): fall back to what was downloaded this session.
    try { return localStorage.getItem(FLAG) === pack.version ? 'ready' : 'none'; } catch (e) { return 'none'; }
  }

  async function downloadPack(onProgress) {
    const pack = await packFiles();
    let done = 0;
    for (const f of pack.files) {
      const res = await fetch(packUrl(f.name));
      if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + f.name);
      const reader = res.body.getReader();
      for (;;) {
        const { done: end, value } = await reader.read();
        if (end) break;
        done += value.length;
        if (onProgress) onProgress(Math.min(done, pack.total), pack.total);
      }
    }
    try { localStorage.setItem(FLAG, pack.version); } catch (e) { /* storage unavailable */ }
    await call('load');
  }

  spawn();
  window.PyEngine = {
    ready: () => readyP,
    run: (payload, timeout) => readyP.then(() => call('run', payload, timeout)),
    grade: (payload, timeout) => readyP.then(() => call('grade', payload, timeout)),
    stop: () => kill('Stopped'),
    busy: () => running > 0,
    needsPack: code => PACK_RE.test(code || ''),
    packState,
    downloadPack
  };
})();
