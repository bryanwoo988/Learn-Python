// Browser smoke test (Playwright + a local static server). Run: node tools/smoke.mjs
// Covers what unit checks cannot: the worker, Run/Stop, the data-pack download,
// offline use, language switching of drafts, settings and phone layout.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

// Playwright is installed globally in this environment, which ESM imports cannot see.
const { chromium } = createRequire(import.meta.url)('playwright');

const root = new URL('..', import.meta.url).pathname;
const PORT = 8765, URL0 = `http://localhost:${PORT}/`;
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore' });
await new Promise(r => setTimeout(r, 800));

const results = [];
let failed = 0;
async function step(name, fn) {
  const t0 = Date.now();
  try { await fn(); results.push(`  ✓ ${name} (${((Date.now() - t0) / 1000).toFixed(1)} s)`); }
  catch (e) { failed++; results.push(`  ✗ ${name}\n      ${String(e.message || e).split('\n')[0]}`); }
  console.log(results[results.length - 1]);
}
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on('pageerror', e => pageErrors.push(e.message));
const outText = sel => page.locator(sel).first().innerText();

try {
  await step('home loads with 4 parts and 18 chapters', async () => {
    await page.goto(URL0);
    await page.waitForSelector('.hero');
    const n = await page.locator('.sec-card').count();
    if (n !== 18) throw new Error(`${n} chapter cards`);
  });

  await step('lesson card runs Python', async () => {
    await page.goto(URL0 + '#/learn/start');
    const card = page.locator('.lesson-card').first();
    await card.locator('.run').click();
    await card.locator('pre.stdout').waitFor({ timeout: 60e3 });
    const out = await card.locator('pre.stdout').innerText();
    if (!out.includes('Hello, world!') || !out.includes('5')) throw new Error(out);
  });

  await step('error card shows traceback and explanation', async () => {
    const card = page.locator('.lesson-card').nth(5);
    await card.locator('.run').click();
    await card.locator('.errbox').waitFor({ timeout: 20e3 });
    const t = await card.locator('.errbox').innerText();
    if (!/SyntaxError/.test(t) || !/Line 1/.test(t) || !/quote|引号/.test(t)) throw new Error(t);
  });

  await step('endless loop: Stop button ends it and the next run works', async () => {
    await page.goto(URL0 + '#/playground');
    const ta = page.locator('#ed textarea');
    await ta.fill('while True:\n    pass');
    await page.click('#runBtn');
    await page.waitForTimeout(1500);
    if (!/Stop|停止/.test(await page.locator('#runBtn').innerText())) throw new Error('button did not turn into Stop');
    await page.click('#runBtn');
    await page.locator('.errbox').waitFor({ timeout: 10e3 });
    await ta.fill('print("alive")');
    await page.click('#runBtn');
    await page.locator('#out pre.stdout').waitFor({ timeout: 30e3 });
    if ((await outText('#out pre.stdout')).trim() !== 'alive') throw new Error('next run failed');
  });

  await step('endless loop is stopped by the timeout', async () => {
    const ta = page.locator('#ed textarea');
    await ta.fill('n = 0\nwhile n >= 0:\n    n += 1');
    const t0 = Date.now();
    await page.click('#runBtn');
    await page.locator('#out .errbox').waitFor({ timeout: 25e3 });
    const t = await outText('#out .errbox');
    if (!/Timeout|too long|太久/.test(t)) throw new Error(t);
    if (Date.now() - t0 > 20e3) throw new Error('took ' + (Date.now() - t0) + ' ms');
  });

  await step('input() reads the Input box', async () => {
    await page.locator('#ed textarea').fill('a = input()\nb = input()\nprint(b, a)');
    await page.locator('#stdin').fill('first\nsecond');
    await page.click('#runBtn');
    await page.waitForFunction(() => /second first/.test(document.querySelector('#out')?.innerText || ''), null, { timeout: 30e3 });
  });

  await step('problem: wrong answer, then accepted', async () => {
    await page.goto(URL0 + '#/problem/103');
    const ta = page.locator('#ed textarea');
    await ta.fill('print("Ada was born in 1815")');
    await page.click('#subBtn');
    await page.locator('.verdict').waitFor({ timeout: 30e3 });
    if (!(await page.locator('.verdict.bad').count())) throw new Error('hard-coded answer was accepted');
    if (!/hidden|隐藏/.test(await outText('.verdict'))) throw new Error('hidden-test message missing');
    await ta.fill('print(name, "was born in", year)');
    await page.click('#subBtn');
    await page.locator('.verdict.ok').waitFor({ timeout: 30e3 });
  });

  await step('language switch: untouched starter follows, edited draft is kept', async () => {
    await page.goto(URL0 + '#/settings');
    await page.click('[data-lang="en"]');
    await page.goto(URL0 + '#/problem/101');
    const ta = page.locator('#ed textarea');
    if (!(await ta.inputValue()).includes('Write your code below')) throw new Error('English starter missing');
    await page.goto(URL0 + '#/problem/102');
    await page.locator('#ed textarea').fill('print("mine")');
    await page.goto(URL0 + '#/settings');
    await page.click('[data-lang="zh"]');
    await page.goto(URL0 + '#/problem/101');
    if (!(await page.locator('#ed textarea').inputValue()).includes('在下面写代码')) throw new Error('starter did not switch to Chinese');
    await page.goto(URL0 + '#/problem/102');
    if ((await page.locator('#ed textarea').inputValue()) !== 'print("mine")') throw new Error('draft changed');
    await page.goto(URL0 + '#/settings');
    await page.click('[data-lang="en"]');
  });

  await step('settings: version, QR code, history', async () => {
    await page.goto(URL0 + '#/settings');
    const t = await page.locator('.keyval').innerText();
    if (!/v1\.0\.0/.test(t)) throw new Error(t);
    if (!(await page.locator('#qr svg').count())) throw new Error('no QR');
    await page.click('#histBtn');
    await page.waitForTimeout(300);
    if (!/1\.0\.0/.test(await page.locator('body').innerText())) throw new Error('history not shown');
    await page.keyboard.press('Escape');
  });

  await step('data pack: download, then pandas and a chart run', async () => {
    await page.goto(URL0 + '#/playground');
    await page.locator('#ed textarea').fill('import pandas as pd\nimport matplotlib.pyplot as plt\ndf = pd.DataFrame({"x": [1, 2, 3]})\nprint(df["x"].sum())\nplt.plot(df["x"])');
    await page.click('#runBtn');
    await page.locator('.modal .pack-btn').click({ timeout: 10e3 });
    await page.locator('.modal').waitFor({ state: 'detached', timeout: 180e3 });
    await page.locator('#out pre.stdout').waitFor({ timeout: 120e3 });
    if ((await outText('#out pre.stdout')).trim() !== '6') throw new Error(await outText('#out'));
    if (!(await page.locator('#out img.plot').count())) throw new Error('no chart');
  });

  await step('data pack is cached under its own name (kept across releases)', async () => {
    const keys = await page.evaluate(() => caches.keys());
    if (!keys.includes('py-syntax-pkgs-314.0.7')) throw new Error(keys.join(', '));
    if (keys.some(k => !k.startsWith('py-syntax-'))) throw new Error('foreign cache: ' + keys.join(', '));
  });

  for (const [id, code] of [[1305, 'result = df.groupby("class")["math"].mean().round(1)'],
    [1701, 'from sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier(random_state=0).fit(X_train, y_train)\nacc = model.score(X_test, y_test)']]) {
    await step(`data-pack problem ${id} is accepted`, async () => {
      await page.goto(URL0 + '#/problem/' + id);
      await page.locator('#ed textarea').fill(code);
      await page.click('#subBtn');
      await page.locator('.verdict').waitFor({ timeout: 90e3 });
      if (!(await page.locator('.verdict.ok').count())) throw new Error(await outText('.verdict') + ' ' + await outText('#out'));
    });
  }

  await step('offline: reload works and pandas still runs', async () => {
    await page.goto(URL0 + '#/playground');
    await page.reload();
    await page.waitForFunction(() => navigator.serviceWorker.controller, null, { timeout: 30e3 });
    await ctx.setOffline(true);
    await page.reload();
    await page.waitForSelector('#view h1', { timeout: 20e3 });
    await page.locator('#ed textarea').fill('import pandas as pd\nprint(pd.Series([1, 2]).mean())');
    await page.click('#runBtn');
    await page.locator('#out pre.stdout').waitFor({ timeout: 120e3 });
    if ((await outText('#out pre.stdout')).trim() !== '1.5') throw new Error(await outText('#out'));
    await ctx.setOffline(false);
  });

  await step('data pack downloaded before the service worker takes over is still cached', async () => {
    const fresh = await browser.newContext({ serviceWorkers: 'block' });
    const p2 = await fresh.newPage();
    await p2.goto(URL0 + '#/settings');
    await p2.locator('#packGo').click({ timeout: 20e3 });
    await p2.locator('.modal .pack-btn').click();
    await p2.locator('.modal').waitFor({ state: 'detached', timeout: 180e3 });
    const missing = await p2.evaluate(async () => {
      const pack = await (await fetch('vendor/pyodide/pack.json')).json();
      const cache = await caches.open('py-syntax-pkgs-' + pack.version);
      const out = [];
      for (const f of pack.files) if (!(await cache.match(new URL('vendor/pyodide/' + f.name, location.href).pathname))) out.push(f.name);
      return out;
    });
    await fresh.close();
    if (missing.length) throw new Error(missing.length + ' wheels not cached, e.g. ' + missing[0]);
  });

  await step('phone width: no horizontal scroll on main pages', async () => {
    const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
    for (const h of ['#/', '#/learn', '#/learn/strings', '#/practice', '#/problem/305', '#/playground', '#/settings', '#/next']) {
      await phone.goto(URL0 + h);
      await phone.waitForTimeout(400);
      const over = await phone.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 1) throw new Error(`${h} overflows by ${over}px`);
    }
    await phone.close();
  });

  await step('no uncaught page errors', async () => { if (pageErrors.length) throw new Error(pageErrors.join(' | ')); });
} finally {
  await browser.close();
  server.kill();
}
console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
