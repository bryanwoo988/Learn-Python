// Runs every lesson example and grades every problem in both languages:
// the reference solution must pass and the starter code must fail.
// Run: node tools/check-problems.mjs [chapter-id …]
import { createPy } from './node-py.mjs';
import { loadContent } from './load-content.mjs';

const only = process.argv.slice(2);
const { PYC } = loadContent();
const py = await createPy();
const errors = [];
let checks = 0;
const want = s => !only.length || only.includes(s);
const filesFor = names => Object.fromEntries((names || []).map(n => [n, PYC.FILES[n]]));

for (const s of PYC.SECTIONS) {
  if (!want(s.id)) continue;
  const L = PYC.LESSONS[s.id];
  for (const [i, c] of (L ? L.cards : []).entries()) {
    if (c.readonly) continue;
    for (const lang of ['en', 'zh']) {
      const r = await py.run({ code: PYC.loc(c.code, lang), setup: c.setup || '', files: filesFor(c.files), stdin: c.stdin || [] });
      checks++;
      if (!!r.error !== !!c.expectError) errors.push(`${s.id} card ${i + 1} (${lang}): ${r.error ? r.error.tb : 'expected an error, got none'}`);
    }
  }
}
for (const p of PYC.PROBLEMS) {
  if (!want(p.section)) continue;
  const base = { solution: PYC.loc(p.solution, 'en'), check: p.check, setup: p.setup || '', cases: p.cases, files: filesFor(p.files), stdin: p.stdin };
  for (const lang of ['en', 'zh']) {
    let r;
    try { r = await py.grade({ ...base, code: PYC.loc(p.solution, lang) }); }
    catch (e) { errors.push(`${p.id}: reference solution crashed: ${e.message}`); break; }
    checks++;
    if (!r.ok) errors.push(`${p.id} (${lang}): solution fails: ${r.reason} ${r.error ? r.error.tb : ''} got=${r.got} exp=${r.exp}`);
    r = await py.grade({ ...base, code: PYC.loc(p.starter, lang) });
    checks++;
    if (r.ok) errors.push(`${p.id} (${lang}): starter already passes`);
  }
}
if (errors.length) { console.error('✗ ' + errors.join('\n✗ ')); process.exit(1); }
console.log(`✓ ${checks} checks passed`);
