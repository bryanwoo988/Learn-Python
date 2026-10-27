// Checks the course content is complete and consistent. Run: node tools/check-content.mjs [--partial]
// --partial skips the per-part problem totals (while content is still being written).
import { loadContent } from './load-content.mjs';

const partial = process.argv.includes('--partial');
const W = loadContent();
const { PYC, PyErrors } = W;
const errors = [];
const err = m => errors.push(m);

// Every bilingual text has both languages.
function walkT(v, where) {
  if (!v || typeof v !== 'object') return;
  if ('en' in v || 'zh' in v) {
    for (const l of ['en', 'zh']) if (typeof v[l] !== 'string' || !v[l].trim()) err(`${where}: missing ${l} text`);
    return;
  }
  for (const [k, x] of Object.entries(v)) walkT(x, `${where}.${k}`);
}

// loc() must change comment text only.
function checkCode(code, where) {
  if (typeof code !== 'string') return;
  const en = PYC.loc(code, 'en'), zh = PYC.loc(code, 'zh');
  for (const [l, c] of [['en', en], ['zh', zh]]) if (/#:/.test(c)) err(`${where}: "#:" left after loc(${l})`);
  const a = en.split('\n'), b = zh.split('\n');
  if (a.length !== b.length) err(`${where}: en/zh line counts differ`);
  a.forEach((ln, i) => {
    const strip = s => s.replace(/#.*$/, '').trimEnd();
    if (ln !== b[i] && strip(ln) !== strip(b[i])) err(`${where}: line ${i + 1} differs outside a comment`);
  });
  if (/[一-鿿]/.test(en)) err(`${where}: Chinese text in the English code`);
  zh.split('\n').forEach((ln, i) => {
    const code = ln.replace(/#.*$/, '');
    if (/[一-鿿]/.test(code)) err(`${where}: line ${i + 1} has Chinese outside a comment (code text stays English)`);
  });
}

// loc() unit checks
const sample = 'x = "a # b"  #: count || 计数\nprint(x)  # plain\n#: Only English\n';
if (PYC.loc(sample, 'en') !== 'x = "a # b"  # count\nprint(x)  # plain\n# Only English\n') err('loc(en) wrong: ' + JSON.stringify(PYC.loc(sample, 'en')));
if (PYC.loc(sample, 'zh') !== 'x = "a # b"  # 计数\nprint(x)  # plain\n# Only English\n') err('loc(zh) wrong: ' + JSON.stringify(PYC.loc(sample, 'zh')));
if (PYC.loc('s = "#: no"', 'zh') !== 's = "#: no"') err('loc touched a string');

const icons = W.icon('__none__');
for (const s of PYC.SECTIONS) {
  if (W.icon(s.icon) === icons) err(`section ${s.id}: icon "${s.icon}" does not exist`);
  if (!PYC.PARTS.some(p => p.id === s.part)) err(`section ${s.id}: unknown part ${s.part}`);
  walkT(s.title, `section ${s.id}`);
  const L = PYC.LESSONS[s.id];
  if (!L) { if (!partial) err(`section ${s.id}: no lesson`); continue; }
  if (L.cards.length < 3) err(`lesson ${s.id}: fewer than 3 cards`);
  if (L.quiz.length < 2) err(`lesson ${s.id}: fewer than 2 quiz questions`);
  walkT(L, `lesson ${s.id}`);
  L.cards.forEach((c, i) => checkCode(c.code, `lesson ${s.id} card ${i + 1}`));
  L.quiz.forEach((q, i) => { if (!(q.answer >= 0 && q.answer < q.options.length)) err(`lesson ${s.id} quiz ${i + 1}: answer out of range`); });
}
if (PYC.SECTIONS.length !== 18) err(`expected 18 chapters, found ${PYC.SECTIONS.length}`);
if (!partial && !PYC.NEXT) err('no "next steps" page');
if (PYC.NEXT) walkT(PYC.NEXT, 'next page');

const ids = new Set();
for (const p of PYC.PROBLEMS) {
  const where = `problem ${p.id}`;
  if (ids.has(p.id)) err(`${where}: duplicate id`);
  ids.add(p.id);
  const s = PYC.SECTIONS.find(x => x.id === p.section);
  if (!s) { err(`${where}: unknown section ${p.section}`); continue; }
  if (Math.floor(p.id / 100) !== s.n) err(`${where}: id should start with chapter ${s.n}`);
  if (!['easy', 'medium', 'hard'].includes(p.level)) err(`${where}: bad level`);
  if (!p.hints || !p.hints.length) err(`${where}: no hints`);
  for (const k of ['title', 'desc', 'explain']) if (!p[k]) err(`${where}: no ${k}`);
  walkT({ title: p.title, desc: p.desc, hints: p.hints, explain: p.explain, given: p.given, check: p.check }, where);
  checkCode(p.starter, where + ' starter');
  checkCode(p.solution, where + ' solution');
  if (!p.check || !['stdout', 'function', 'values', 'figure'].includes(p.check.type)) err(`${where}: bad check`);
  for (const f of p.files || []) if (!(f in PYC.FILES)) err(`${where}: unknown file ${f}`);
}
const want = { beginner: 35, intermediate: 20, data: 15, ml: 13 };
if (!partial) for (const [part, n] of Object.entries(want)) {
  const got = PYC.PROBLEMS.filter(p => PYC.SECTIONS.find(s => s.id === p.section).part === part).length;
  if (Math.abs(got - n) > 2) err(`part ${part}: ${got} problems, want ${n} ± 2`);
}
for (const t of ['SyntaxError', 'IndentationError', 'NameError', 'TypeError', 'ValueError', 'IndexError', 'KeyError', 'ZeroDivisionError', 'AttributeError', 'ModuleNotFoundError', 'Timeout', 'Stopped', 'OutputLimit'])
  for (const l of ['en', 'zh']) if (!PyErrors || !PyErrors.explain(t, l)) err(`no ${l} explanation for ${t}`);

if (errors.length) { console.error('✗ ' + errors.slice(0, 60).join('\n✗ ') + (errors.length > 60 ? `\n… ${errors.length - 60} more` : '')); process.exit(1); }
console.log(`✓ ${PYC.SECTIONS.length} chapters, ${Object.keys(PYC.LESSONS).length} lessons, ${PYC.PROBLEMS.length} problems OK`);
