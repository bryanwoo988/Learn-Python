// Copies the parts of a Pyodide release this app needs into vendor/pyodide/.
// Usage: node tools/vendor-pyodide.mjs path/to/pyodide-<version>.tar.bz2
// Core layer (precached): the loader, wasm, standard library and lock file.
// Data pack (downloaded on demand): the wheels numpy, pandas, matplotlib,
// scikit-learn and scipy need, listed with sizes in vendor/pyodide/pack.json.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, copyFileSync, statSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tarball = process.argv[2];
if (!tarball) { console.error('usage: node tools/vendor-pyodide.mjs <pyodide tarball>'); process.exit(1); }
const out = new URL('../vendor/pyodide/', import.meta.url).pathname;
const CORE = ['pyodide.mjs', 'pyodide.asm.mjs', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json', 'package.json'];
const WANT = ['numpy', 'pandas', 'matplotlib', 'scikit-learn', 'scipy'];

const tmp = mkdtempSync(join(tmpdir(), 'pyodide-'));
const tar = (...members) => execFileSync('tar', ['xjf', tarball, '-C', tmp, ...members.map(m => 'pyodide/' + m)]);
tar(...CORE);
const lock = JSON.parse(readFileSync(join(tmp, 'pyodide/pyodide-lock.json'), 'utf8'));
const seen = new Set();
const walk = n => { n = n.toLowerCase(); if (seen.has(n)) return; seen.add(n); (lock.packages[n].depends || []).forEach(walk); };
WANT.forEach(walk);
const wheels = [...seen].sort().map(n => lock.packages[n].file_name);
tar(...wheels);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of [...CORE, ...wheels]) copyFileSync(join(tmp, 'pyodide', f), join(out, f));
const files = wheels.map(name => ({ name, size: statSync(join(out, name)).size }));
const version = JSON.parse(readFileSync(join(out, 'package.json'), 'utf8')).version;
const total = files.reduce((s, f) => s + f.size, 0);
writeFileSync(join(out, 'pack.json'), JSON.stringify({ version, packages: WANT, files, total }, null, 1) + '\n');
rmSync(tmp, { recursive: true, force: true });
const core = CORE.reduce((s, f) => s + statSync(join(out, f)).size, 0);
console.log(`Pyodide ${version}: core ${(core / 1e6).toFixed(1)} MB, data pack ${files.length} wheels ${(total / 1e6).toFixed(1)} MB`);
