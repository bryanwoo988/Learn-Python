(function () {
  'use strict';

  // ---------------------------------------------------------------- i18n
  const STR = {
    appName: { en: 'Python Syntax', zh: 'Python语言' },
    tagline: { en: 'Learn Python by doing — from your first print() to data analysis and machine learning', zh: '边做边学 Python —— 从第一个 print() 到数据分析和机器学习' },
    navHome: { en: 'Home', zh: '首页' }, navLearn: { en: 'Learn', zh: '学习' }, navPractice: { en: 'Practice', zh: '练习' }, navPlay: { en: 'Playground', zh: '练习场' },
    starting: { en: 'Starting Python… (the first time downloads about 13 MB)', zh: '正在启动 Python…（第一次需下载约 13 MB）' },
    running: { en: 'Running…', zh: '运行中…' },
    engineFail: { en: 'Python could not start. Check your connection and reload the page.', zh: 'Python 无法启动。请检查网络后刷新页面。' },
    solved: { en: 'solved', zh: '已解决' }, chaptersDone: { en: 'chapters', zh: '章节' },
    continue: { en: 'Continue', zh: '继续' },
    nextUp: { en: 'Next problem', zh: '下一题' }, allDone: { en: 'Every problem solved — amazing!', zh: '所有题目都完成了——太棒了！' },
    studyPlan: { en: 'Course', zh: '课程' }, chapterN: { en: 'Chapter {n}', zh: '第 {n} 章' }, learnThen: { en: 'Read each chapter, then solve its problems.', zh: '先学每一章，再做这一章的练习。' },
    run: { en: 'Run', zh: '运行' }, stop: { en: 'Stop', zh: '停止' }, submit: { en: 'Submit', zh: '提交' }, reset: { en: 'Reset', zh: '重置' },
    hint: { en: 'Hint', zh: '提示' }, solution: { en: 'Solution', zh: '答案' },
    useSolution: { en: 'Copy into editor', zh: '复制到编辑器' },
    revealConfirm: { en: 'Try a little longer? Reveal the solution anyway?', zh: '再试一会儿？仍然要查看答案吗？' },
    noMoreHints: { en: 'No more hints.', zh: '没有更多提示了。' },
    given: { en: 'Already defined for you', zh: '已经为你准备好的变量' },
    files: { en: 'Files', zh: '文件' },
    expected: { en: 'Expected', zh: '期望结果' }, yourOutput: { en: 'Your output', zh: '你的输出' }, output: { en: 'Output', zh: '输出' },
    noOutput: { en: '(no output — use print() to show something)', zh: '（没有输出——用 print() 显示内容）' },
    showExpected: { en: 'Show expected output', zh: '显示期望输出' },
    accepted: { en: 'Accepted', zh: '通过' }, wrong: { en: 'Not yet', zh: '还不对' }, error: { en: 'Error', zh: '错误' },
    r_stdout: { en: 'The printed output is different from what was expected.', zh: '打印出来的内容和期望的不一样。' },
    r_return: { en: 'Your function returned a different value.', zh: '你的函数返回的值不一样。' },
    r_value: { en: 'A value is different from what was expected.', zh: '有一个值和期望的不一样。' },
    r_missing: { en: 'Could not find {g}. Check the name is spelled exactly as in the task.', zh: '找不到 {g}。检查名字是否和题目里写的一模一样。' },
    r_figure: { en: 'The chart does not match. Check the chart type, the data, the title and the axis labels.', zh: '图表不符合要求。检查图表类型、数据、标题和坐标轴标签。' },
    r_assert: { en: 'A requirement is not met.', zh: '有一项要求没有达到。' },
    r_error: { en: 'Your code stopped with an error.', zh: '代码运行出错了。' },
    hiddenCase: { en: 'This happened on a hidden test, with different input values. Make sure your code works for any input, not just the example.', zh: '这发生在一个隐藏测试上（输入值不同）。确认代码对任何输入都成立，而不只是示例。' },
    tests: { en: 'Checked on {n} test(s)', zh: '会用 {n} 组测试检查' },
    prev: { en: 'Previous', zh: '上一题' }, next: { en: 'Next', zh: '下一题' }, backList: { en: 'All problems', zh: '全部题目' },
    quiz: { en: 'Quick quiz', zh: '小测验' }, quizDone: { en: 'Chapter complete!', zh: '本章完成！' },
    correct: { en: 'Correct!', zh: '正确！' }, incorrect: { en: 'Not quite.', zh: '不太对。' },
    practiceSection: { en: 'Practice this chapter', zh: '练习本章' },
    concepts: { en: 'Concepts', zh: '知识点' }, readOnly: { en: 'Read only — this needs a computer, not this app', zh: '仅供阅读——需要在电脑上运行，本应用里不能运行' },
    easy: { en: 'Easy', zh: '简单' }, medium: { en: 'Medium', zh: '中等' }, hard: { en: 'Hard', zh: '困难' },
    filterAll: { en: 'All', zh: '全部' }, filterTodo: { en: 'To do', zh: '未完成' }, filterDone: { en: 'Solved', zh: '已解决' },
    search: { en: 'Search problems…', zh: '搜索题目…' },
    input: { en: 'Input (one line per input() call)', zh: '输入（每次 input() 读一行）' },
    playIntro: { en: 'Write any Python here. Sample files are ready to open; every run starts fresh.', zh: '在这里随意写 Python。示例文件可以直接打开；每次运行都从头开始。' },
    insert: { en: 'Insert code to open it', zh: '插入打开它的代码' },
    nextSteps: { en: 'What to learn next', zh: '下一步学什么' },
    shortcut: { en: 'Ctrl/⌘ + Enter to run', zh: 'Ctrl/⌘ + Enter 运行' },
    packTitle: { en: 'Data libraries needed', zh: '需要数据分析库' },
    packBody: { en: 'This chapter uses numpy, pandas, matplotlib and scikit-learn. They download once (about {mb} MB) and then work offline.', zh: '这一章要用 numpy、pandas、matplotlib 和 scikit-learn。只需下载一次（约 {mb} MB），之后可离线使用。' },
    packBtn: { en: 'Download data libraries', zh: '下载数据分析库' },
    packOffline: { en: 'You are offline. Connect to the internet once to download them.', zh: '你现在离线。请联网一次以下载这些库。' },
    packFail: { en: 'Download failed. Check your connection and try again.', zh: '下载失败。请检查网络后再试。' },
    packDone: { en: 'Data libraries ready', zh: '数据分析库已就绪' },
    packLoading: { en: 'Downloading… {p}%', zh: '下载中… {p}%' },
    packBadge: { en: 'one-time download', zh: '需一次性下载' },
    later: { en: 'Later', zh: '稍后' },
    install: { en: 'Install', zh: '安装' }, about: { en: 'About', zh: '关于' },
    resetProgress: { en: 'Reset progress', zh: '重置进度' }, resetConfirm: { en: 'Erase all progress and saved code?', zh: '要清除所有进度和保存的代码吗？' },
    close: { en: 'Close', zh: '关闭' },
    offlineReady: { en: 'Ready to work offline', zh: '已可离线使用' },
    iosInstall: {
      en: '<ol><li>Open this page in <b>Safari</b>.</li><li>Tap the <b>Share</b> button (square with an up arrow).</li><li>Choose <b>Add to Home Screen</b>, then <b>Add</b>.</li></ol><p class="muted small">The app then opens full-screen from your home screen and works offline.</p>',
      zh: '<ol><li>用 <b>Safari</b> 打开本页。</li><li>点 <b>分享</b> 按钮（方框加向上箭头）。</li><li>选择 <b>添加到主屏幕</b>，再点 <b>添加</b>。</li></ol><p class="muted small">之后从主屏幕打开即为全屏 App，并可离线使用。</p>'
    },
    settings: { en: 'Settings', zh: '设置' }, language: { en: 'Language', zh: '语言' },
    appearance: { en: 'Appearance', zh: '外观' }, mode: { en: 'Mode', zh: '模式' },
    modeSystem: { en: 'System', zh: '跟随系统' }, modeLight: { en: 'Light', zh: '浅色' }, modeDark: { en: 'Dark', zh: '深色' },
    lightTheme: { en: 'Light theme', zh: '浅色主题' }, darkTheme: { en: 'Dark theme', zh: '深色主题' },
    th_classic: { en: 'Classic', zh: '经典' }, th_paper: { en: 'Paper', zh: '纸张' }, th_mint: { en: 'Mint', zh: '薄荷' }, th_lavender: { en: 'Lavender', zh: '薰衣草' },
    th_midnight: { en: 'Midnight', zh: '午夜' }, th_oled: { en: 'OLED Black', zh: '纯黑 OLED' }, th_slate: { en: 'Slate', zh: '石板' }, th_grape: { en: 'Grape', zh: '葡萄' },
    themeNote: { en: 'In System mode the app follows your phone: the light theme by day, the dark theme at night.', zh: '「跟随系统」时，手机为浅色就用浅色主题，为深色就用深色主题。' },
    share: { en: 'Share this app', zh: '分享本应用' }, shareHint: { en: 'Scan the QR code to open the app on another phone.', zh: '扫描二维码即可在另一部手机上打开本应用。' },
    shareBtn: { en: 'Share link', zh: '分享链接' }, copyLink: { en: 'Copy link', zh: '复制链接' }, copied: { en: 'Link copied', zh: '链接已复制' },
    installApp: { en: 'Install app', zh: '安装应用' }, installedNote: { en: 'Installed — you are using the app version.', zh: '已安装——你正在使用 App 版本。' },
    installHint: { en: 'Add it to your home screen for full-screen, offline use.', zh: '添加到主屏幕，即可全屏并离线使用。' },
    info: { en: 'App info', zh: '应用信息' }, version: { en: 'Version', zh: '版本' }, history: { en: 'Update history', zh: '更新记录' },
    checkUpdate: { en: 'Check for updates', zh: '检查更新' }, upToDate: { en: 'You have the latest version.', zh: '已是最新版本。' },
    downloading: { en: 'Downloading the new version…', zh: '正在下载新版本…' }, offline: { en: 'Offline use', zh: '离线使用' },
    offlineYes: { en: 'Ready', zh: '已就绪' }, offlineNo: { en: 'Not yet — open the app online once', zh: '尚未——请在联网时打开一次' },
    dataPack: { en: 'Data libraries', zh: '数据分析库' }, packNo: { en: 'Not downloaded (≈{mb} MB, needed from chapter 12)', zh: '尚未下载（约 {mb} MB，第 12 章起需要）' },
    progressData: { en: 'Progress', zh: '学习进度' },
    aboutBody: {
      en: '<p>An interactive Python course for complete beginners, from the basics to data analysis and machine learning. The order of chapters follows the <a href="https://www.w3schools.com/python/" target="_blank" rel="noopener">W3Schools Python tutorial</a>; all explanations, examples, data and problems are written for this app.</p><p><b>Engine.</b> Your code runs locally in your browser with <a href="https://pyodide.org" target="_blank" rel="noopener">Pyodide</a> (Python 3.14 compiled to WebAssembly). Nothing is sent to a server, and the app works offline once installed.</p><p><b>Libraries.</b> The standard library is always available. numpy, pandas, matplotlib, scipy and scikit-learn download once when you first need them. Deep-learning libraries (TensorFlow, PyTorch) cannot run in a browser.</p><p><b>Differences from a normal computer.</b> <code>input()</code> reads from the Input box; there is no internet access from Python; files you create are reset on every run.</p>',
      zh: '<p>一个给零基础学员的互动 Python 课程，从基础一直到数据分析和机器学习。章节顺序参考 <a href="https://www.w3schools.com/python/" target="_blank" rel="noopener">W3Schools Python 教程</a>；所有讲解、例子、数据和题目都是为本应用重新编写的。</p><p><b>引擎。</b>代码通过 <a href="https://pyodide.org" target="_blank" rel="noopener">Pyodide</a>（编译成 WebAssembly 的 Python 3.14）在你的浏览器本地运行，不会发送到服务器；安装后可离线使用。</p><p><b>库。</b>标准库随时可用。numpy、pandas、matplotlib、scipy 和 scikit-learn 在第一次需要时下载一次。深度学习库（TensorFlow、PyTorch）无法在浏览器里运行。</p><p><b>和普通电脑的不同。</b><code>input()</code> 从「输入」框读取；Python 不能上网；你创建的文件每次运行都会重置。</p>'
    }
  };

  const store = {
    get(k, d) { try { const v = localStorage.getItem('pysyntax.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('pysyntax.' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  let lang = store.get('lang', (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en');
  const t = k => (STR[k] ? STR[k][lang] : k);
  const tr = o => (o == null ? '' : typeof o === 'string' ? o : o[lang] || o.en);
  const fill = (s, m) => s.replace(/\{(\w+)\}/g, (_, k) => m[k]);

  const progress = Object.assign({ solved: {}, lessons: {}, drafts: {} }, store.get('progress', {}));
  const saveProgress = () => store.set('progress', progress);

  const PYC = window.PYC, Engine = window.PyEngine;
  const { SECTIONS, PARTS, PROBLEMS, LESSONS, FILES } = PYC;
  const loc = code => PYC.loc(code, lang);
  const byId = Object.fromEntries(PROBLEMS.map(p => [p.id, p]));
  const pid = p => `${Math.floor(p.id / 100)}.${p.id % 100}`;
  const needsPackSec = s => PYC.partOf(s).needsPack;
  const filesFor = names => Object.fromEntries((names || []).map(n => [n, FILES[n]]));

  // ---------------------------------------------------------------- helpers
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function h(html) { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }
  function toast(msg, kind) {
    const el = h(`<div class="toast ${kind || ''}">${msg}</div>`);
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 2200);
  }
  function modal(inner) {
    const m = h(`<div class="modal" role="dialog" aria-modal="true"><div class="modal-card card">${inner}</div></div>`);
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) m.remove(); });
    return m;
  }

  // ---------------------------------------------------------------- Python engine
  let engineState = 'starting';
  Engine.ready().then(() => { engineState = 'ready'; }, () => { engineState = 'failed'; });
  const TIMEOUT = 10e3, TIMEOUT_PACK = 40e3;

  // ---------------------------------------------------------------- data pack (numpy, pandas, …)
  let packInfo = null, packReady = false;
  fetch('vendor/pyodide/pack.json').then(r => r.json()).then(p => { packInfo = p; }).catch(() => {});
  Engine.packState().then(s => { packReady = s === 'ready'; }).catch(() => {});
  const packMB = () => (packInfo ? Math.round(packInfo.total / 1e6) : 36);

  function packCard() {
    return `<div class="card gate"><h3 class="with-icon">${icon('package')} ${t('packTitle')}</h3>
      <p>${fill(t('packBody'), { mb: packMB() })}</p>
      <div class="bar pack-bar" hidden><span style="width:0"></span></div>
      <p class="muted small pack-msg"></p>
      <button class="btn primary pack-btn">${icon('download')} ${t('packBtn')}</button></div>`;
  }
  // Wires a packCard() element; resolves true once downloaded.
  function wirePack(el) {
    return new Promise(resolve => {
      const btn = $('.pack-btn', el), msg = $('.pack-msg', el), bar = $('.pack-bar', el);
      btn.onclick = async () => {
        if (!navigator.onLine) { msg.textContent = t('packOffline'); return; }
        btn.disabled = true; bar.hidden = false;
        try {
          await Engine.downloadPack((done, total) => {
            const p = Math.floor((done / total) * 100);
            $('span', bar).style.width = p + '%';
            msg.textContent = fill(t('packLoading'), { p });
          });
          packReady = true;
          msg.textContent = t('packDone');
          resolve(true);
        } catch (e) {
          btn.disabled = false;
          msg.textContent = navigator.onLine ? t('packFail') : t('packOffline');
        }
      };
    });
  }
  // Before code that needs the data libraries: asks to download them if missing.
  async function ensurePack() {
    if (packReady) return true;
    if ((await Engine.packState()) === 'ready') { packReady = true; return true; }
    const m = modal(`${packCard()}<div class="right"><button class="btn ghost later">${t('later')}</button></div>`);
    $('.gate', m).classList.remove('card');
    return new Promise(resolve => {
      $('.later', m).onclick = () => { m.remove(); resolve(false); };
      wirePack(m).then(() => { setTimeout(() => m.remove(), 600); resolve(true); });
    });
  }

  // ---------------------------------------------------------------- output
  function errorBox(err) {
    const why = window.PyErrors.explain(err.type, lang);
    const tb = err.tb || err.type;
    return `<div class="errbox"><pre>${esc(tb)}</pre>${why ? `<div class="why-err">${icon('bulb')} ${esc(why)}</div>` : ''}</div>`;
  }
  function outputHTML(r) {
    const parts = [];
    if (r.stdout) parts.push(`<pre class="stdout">${esc(r.stdout)}</pre>`);
    for (const img of r.images || []) parts.push(`<img class="plot" alt="chart" src="data:image/png;base64,${img}">`);
    if (r.error) parts.push(errorBox(r.error));
    if (!parts.length) parts.push(`<div class="muted small">${t('noOutput')}</div>`);
    return parts.join('');
  }

  // One Run/Stop button. job() returns a promise; while it runs the button stops it.
  function runButton(btn, job) {
    const idle = btn.innerHTML;
    let active = false;
    const go = async () => {
      if (active) { Engine.stop(); return; }
      active = true;
      btn.innerHTML = `${icon('stop')} ${t('stop')}`;
      btn.classList.add('stop');
      try { await job(); } finally {
        active = false;
        btn.innerHTML = idle;
        btn.classList.remove('stop');
      }
    };
    btn.onclick = go;
    return go;
  }
  function waiting(out) {
    out.innerHTML = `<div class="loading inline"><div class="spinner"></div>${engineState === 'ready' ? t('running') : t('starting')}</div>`;
  }
  async function runInto(out, payload, timeout) {
    waiting(out);
    try {
      const r = await Engine.run(payload, timeout);
      out.innerHTML = outputHTML(r);
      return r;
    } catch (e) {
      out.innerHTML = `<div class="err">${t('engineFail')}<div class="small muted">${esc(e.message || e)}</div></div>`;
      return null;
    }
  }

  // ---------------------------------------------------------------- editor
  const KW = 'False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|match|case|nonlocal|not|or|pass|raise|return|try|while|with|yield|self';
  const HL_RE = new RegExp(`(#[^\\n]*)|((?:[rRbBfF]{1,2})?(?:"""[\\s\\S]*?(?:"""|$)|'''[\\s\\S]*?(?:'''|$)|"(?:[^"\\\\\\n]|\\\\.)*"?|'(?:[^'\\\\\\n]|\\\\.)*'?))|\\b(\\d+(?:\\.\\d+)?(?:e-?\\d+)?)\\b|\\b(${KW})\\b|\\b([A-Za-z_][A-Za-z0-9_]*)(?=\\s*\\()`, 'g');
  function highlight(code) {
    let out = '', last = 0, m;
    HL_RE.lastIndex = 0;
    while ((m = HL_RE.exec(code))) {
      if (!m[0]) { HL_RE.lastIndex++; continue; }
      out += esc(code.slice(last, m.index));
      const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'n' : m[4] ? 'k' : 'f';
      out += `<span class="tk-${cls}">${esc(m[0])}</span>`;
      last = m.index + m[0].length;
    }
    return out + esc(code.slice(last)) + '\n';
  }

  const CHIPS = ['⇥', 'print(', ':', '(', ')', '[', ']', '"', '=', '==', 'for ', ' in ', 'if ', 'else:', 'def ', 'return ', 'range(', 'len(', '.', ',', '+', '#'];
  const IND = '    ';

  // Textarea + highlight layer. onChange fires only for the learner's own edits.
  function createEditor(mount, value, opts = {}) {
    const el = h(`<div class="editor-box">
      <div class="editor"><pre class="hl" aria-hidden="true"></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Python editor"></textarea></div>
      ${opts.chips === false ? '' : `<div class="chips">${CHIPS.map(c => `<button type="button" class="chip">${esc(c)}</button>`).join('')}</div>`}
    </div>`);
    mount.appendChild(el);
    const ta = $('textarea', el), pre = $('.hl', el);
    const sync = user => {
      pre.innerHTML = highlight(ta.value);
      ta.style.height = 'auto';
      const hgt = Math.max(ta.scrollHeight, opts.minHeight || 120);
      ta.style.height = hgt + 'px';
      pre.style.height = hgt + 'px';
      if (user && opts.onChange) opts.onChange(ta.value);
    };
    const insert = text => {
      ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, 'end');
      ta.focus();
      sync(true);
    };
    const lineStart = () => ta.value.lastIndexOf('\n', ta.selectionStart - 1) + 1;
    function dedent() {
      const s = lineStart();
      const n = (ta.value.slice(s).match(/^ {1,4}/) || [''])[0].length;
      if (!n) return;
      const pos = ta.selectionStart;
      ta.setRangeText('', s, s + n, 'preserve');
      ta.selectionStart = ta.selectionEnd = Math.max(s, pos - n);
      sync(true);
    }
    ta.value = value || '';
    ta.addEventListener('input', () => sync(true));
    ta.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (opts.onRun) opts.onRun(); }
      else if (e.key === 'Tab' && e.shiftKey) { e.preventDefault(); dedent(); }
      else if (e.key === 'Tab') { e.preventDefault(); insert(IND); }
      else if (e.key === 'Enter' && !e.isComposing) {
        // Keep the indent; one level more after a line ending in ":".
        e.preventDefault();
        const line = ta.value.slice(lineStart(), ta.selectionStart);
        const indent = line.match(/^ */)[0] + (/:\s*(#.*)?$/.test(line) ? IND : '');
        insert('\n' + indent);
      }
    });
    el.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
      const c = b.textContent;
      if (c === '⇥') insert(IND); else insert(c);
    }));
    requestAnimationFrame(() => sync(false));
    return { get: () => ta.value, set: v => { ta.value = v; sync(false); }, focus: () => ta.focus(), el: ta };
  }

  // ---------------------------------------------------------------- views
  const view = () => $('#view');

  function sectionStats(secId) {
    const ps = PROBLEMS.filter(p => p.section === secId);
    return { total: ps.length, done: ps.filter(p => progress.solved[p.id]).length };
  }
  function ring(pct, label) {
    const r = 42, c = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 100 100" role="img" aria-label="${esc(label)}">
      <circle cx="50" cy="50" r="${r}" class="ring-bg"/>
      <circle cx="50" cy="50" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}"/>
      <text x="50" y="50" class="ring-text">${esc(label)}</text></svg>`;
  }
  const levelBadge = lv => `<span class="badge ${lv}">${t(lv)}</span>`;
  const packBadge = () => `<span class="badge pack" title="${esc(fill(t('packBody'), { mb: packMB() }))}">${icon('package')} ${t('packBadge')}</span>`;

  function secCard(s, withActions) {
    const st = sectionStats(s.id);
    return `<div class="card sec-card">
      <div class="sec-head"><span class="sec-icon">${icon(s.icon)}</span><span class="muted small">${fill(t('chapterN'), { n: s.n })}</span>${progress.lessons[s.id] ? `<span class="tick" title="done">${icon('check')}</span>` : ''}</div>
      <h3>${esc(tr(s.title))}</h3>
      <div class="bar"><span style="width:${st.total ? (st.done / st.total) * 100 : 0}%"></span></div>
      <div class="muted small">${st.done}/${st.total} ${t('solved')}</div>
      ${withActions ? `<div class="sec-actions"><a class="btn" href="#/learn/${s.id}">${t('navLearn')}</a><a class="btn ghost" href="#/practice/${s.id}">${t('navPractice')}</a></div>` : ''}
    </div>`;
  }
  const partHead = p => `<h2 class="part-head">${esc(tr(p.title))} ${p.needsPack ? packBadge() : ''}</h2>`;

  function renderHome() {
    const solved = PROBLEMS.filter(p => progress.solved[p.id]).length;
    const chaptersDone = SECTIONS.filter(s => progress.lessons[s.id]).length;
    const next = PROBLEMS.find(p => !progress.solved[p.id]);
    view().innerHTML = `
      <section class="hero card">
        <div class="hero-top">
          <img src="icons/icon-192.png" alt="" class="hero-logo" width="72" height="72">
          <div><h1>${t('appName')}</h1><p class="muted">${t('tagline')}</p></div>
        </div>
        <div class="stats">
          <div class="stat">${ring(PROBLEMS.length ? solved / PROBLEMS.length : 0, `${solved}/${PROBLEMS.length}`)}<div>${t('solved')}</div></div>
          <div class="stat">${ring(chaptersDone / SECTIONS.length, `${chaptersDone}/${SECTIONS.length}`)}<div>${t('chaptersDone')}</div></div>
        </div>
      </section>
      <a class="card next-card" href="${next ? '#/problem/' + next.id : '#/practice'}">
        ${next ? `<span class="next-icon">${icon('flag')}</span>
          <span class="next-body"><span class="muted small">${t('nextUp')}</span>
            <span class="next-title">${pid(next)} ${esc(tr(next.title))}</span>${levelBadge(next.level)}</span>
          <span class="btn primary">${t('continue')} ${icon('chevron')}</span>`
        : `<span class="next-icon">${icon('trophy')}</span><span class="next-body"><span class="next-title">${t('allDone')}</span></span>`}
      </a>
      <p class="muted">${t('learnThen')}</p>
      ${PARTS.map(p => `${partHead(p)}<section class="sec-grid">${SECTIONS.filter(s => s.part === p.id).map(s => secCard(s, true)).join('')}</section>`).join('')}
      <a class="card next-card" href="#/next"><span class="next-icon">${icon('compass')}</span><span class="next-body"><span class="next-title">${t('nextSteps')}</span></span>${icon('chevron')}</a>`;
  }

  function renderLearnIndex() {
    view().innerHTML = `<h1>${t('navLearn')}</h1>
      ${PARTS.map(p => `${partHead(p)}<section class="sec-grid">${SECTIONS.filter(s => s.part === p.id).map(s => {
        const L = LESSONS[s.id];
        return `<a class="card sec-card link-card" href="#/learn/${s.id}">
          <div class="sec-head"><span class="sec-icon">${icon(s.icon)}</span><span class="muted small">${s.n}</span>${progress.lessons[s.id] ? `<span class="tick">${icon('check')}</span>` : ''}</div>
          <h3>${esc(tr(s.title))}</h3>
          <div class="muted small">${L ? `${L.cards.length} ${t('concepts').toLowerCase()} · ${L.quiz.length} quiz` : ''}</div></a>`;
      }).join('')}</section>`).join('')}
      <a class="card next-card" href="#/next"><span class="next-icon">${icon('compass')}</span><span class="next-body"><span class="next-title">${t('nextSteps')}</span></span>${icon('chevron')}</a>`;
  }

  // Shows the download card above a chapter or problem that needs the data pack.
  function gateInto(el, sec) {
    if (!needsPackSec(sec) || packReady) return;
    Engine.packState().then(s => {
      if (s === 'ready') { packReady = true; return; }
      const card = h(packCard());
      el.prepend(card);
      wirePack(card).then(() => setTimeout(() => card.remove(), 800));
    });
  }

  const lessonDrafts = {};
  function renderLesson(secId) {
    const sec = SECTIONS.find(s => s.id === secId);
    const L = LESSONS[secId];
    if (!sec || !L) return renderLearnIndex();
    const idx = SECTIONS.indexOf(sec);
    const st = sectionStats(secId);
    const v = view();
    v.innerHTML = `
      <nav class="crumbs"><a href="#/learn">${t('navLearn')}</a> › ${esc(tr(PYC.partOf(sec).title))}</nav>
      <h1 class="with-icon"><span class="sec-icon">${icon(sec.icon)}</span>${sec.n}. ${esc(tr(sec.title))}</h1>
      <div id="gate"></div>
      <div class="lead">${tr(L.intro)}</div>
      <div id="cards"></div>
      <h2 class="with-icon">${icon('quiz')} ${t('quiz')}</h2>
      <div id="quiz"></div>
      ${st.total ? `<div class="card cta">
        <div>${t('practiceSection')}: <b>${esc(tr(sec.title))}</b> (${st.done}/${st.total})</div>
        <a class="btn primary" href="#/practice/${secId}">${t('navPractice')} ${icon('chevron')}</a>
      </div>` : ''}
      <div class="pager">
        ${idx > 0 ? `<a class="btn ghost" href="#/learn/${SECTIONS[idx - 1].id}">← ${esc(tr(SECTIONS[idx - 1].title))}</a>` : '<span></span>'}
        ${idx < SECTIONS.length - 1 ? `<a class="btn ghost" href="#/learn/${SECTIONS[idx + 1].id}">${esc(tr(SECTIONS[idx + 1].title))} →</a>` : `<a class="btn ghost" href="#/next">${t('nextSteps')} →</a>`}
      </div>`;
    gateInto($('#gate', v), sec);

    const cards = $('#cards', v);
    L.cards.forEach((c, i) => {
      const key = secId + i;
      const card = h(`<article class="card lesson-card">
        <h3><span class="step">${i + 1}</span> ${tr(c.title)}</h3>
        <div class="body">${tr(c.body)}</div>
        ${c.readonly ? `<div class="muted small">${icon('info')} ${t('readOnly')}</div><pre class="code">${highlight(loc(c.code))}</pre>` : `
        <div class="ed"></div>
        ${c.stdin ? `<label class="stdin"><span class="small muted">${t('input')}</span><textarea rows="${c.stdin.length}">${esc(c.stdin.join('\n'))}</textarea></label>` : ''}
        <div class="row"><button class="btn primary run">${icon('play', 'fill')} ${t('run')}</button><button class="btn ghost rst">${icon('reset')} ${t('reset')}</button><span class="muted small kbd">${t('shortcut')}</span></div>
        <div class="out"></div>`}
      </article>`);
      cards.appendChild(card);
      if (c.readonly) return;
      const out = $('.out', card);
      const stdinBox = $('.stdin textarea', card);
      const job = async () => {
        if (needsPackSec(sec) && !(await ensurePack())) return;
        await runInto(out, { code: ed.get(), setup: c.setup || '', files: filesFor(c.files), stdin: stdinBox ? stdinBox.value.split('\n') : [] }, needsPackSec(sec) ? TIMEOUT_PACK : TIMEOUT);
      };
      const go = runButton($('.run', card), job);
      const ed = createEditor($('.ed', card), lessonDrafts[key] || loc(c.code), {
        chips: false, minHeight: 60,
        onChange: val => { lessonDrafts[key] = val; },
        onRun: go
      });
      $('.rst', card).onclick = () => { delete lessonDrafts[key]; ed.set(loc(c.code)); out.innerHTML = ''; };
    });

    const quiz = $('#quiz', v);
    const answered = {};
    L.quiz.forEach((q, qi) => {
      const box = h(`<div class="card quiz-q"><div class="q">${qi + 1}. ${tr(q.q)}</div>
        <div class="opts">${q.options.map((o, oi) => `<button class="opt" data-i="${oi}">${tr(o)}</button>`).join('')}</div>
        <div class="why"></div></div>`);
      quiz.appendChild(box);
      box.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const i = +b.dataset.i;
        box.querySelectorAll('.opt').forEach(x => x.classList.remove('right', 'wrongc'));
        const ok = i === q.answer;
        b.classList.add(ok ? 'right' : 'wrongc');
        if (ok) answered[qi] = true;
        $('.why', box).innerHTML = `<b class="${ok ? 'good' : 'badc'}">${icon(ok ? 'check' : 'x')} ${ok ? t('correct') : t('incorrect')}</b> ${ok ? tr(q.why) : ''}`;
        if (Object.keys(answered).length === L.quiz.length && !progress.lessons[secId]) {
          progress.lessons[secId] = true; saveProgress();
          toast(t('quizDone'), 'ok');
        }
      });
    });
  }

  let practiceFilter = 'all', practiceQuery = '';
  function renderPractice(secFilter) {
    const v = view();
    v.innerHTML = `<h1>${t('navPractice')}</h1>
      <div class="toolbar">
        <input type="search" id="q" placeholder="${t('search')}" value="${esc(practiceQuery)}">
        <div class="seg">${['all', 'todo', 'done'].map(f => `<button data-f="${f}" class="${practiceFilter === f ? 'on' : ''}">${t('filter' + f[0].toUpperCase() + f.slice(1))}</button>`).join('')}</div>
      </div>
      <div id="plist"></div>`;
    const list = $('#plist', v);
    const draw = () => {
      const q = practiceQuery.trim().toLowerCase();
      list.innerHTML = SECTIONS.filter(s => !secFilter || s.id === secFilter).map(s => {
        const ps = PROBLEMS.filter(p => p.section === s.id)
          .filter(p => practiceFilter === 'all' || (practiceFilter === 'done') === !!progress.solved[p.id])
          .filter(p => !q || pid(p).includes(q) || p.title.en.toLowerCase().includes(q) || p.title.zh.includes(q));
        if (!ps.length) return '';
        const st = sectionStats(s.id);
        return `<section class="plist-sec"><h2><span class="sec-icon sm">${icon(s.icon)}</span>${s.n}. ${esc(tr(s.title))} <span class="muted small">${st.done}/${st.total}</span>
            <a class="small" href="#/learn/${s.id}">${t('navLearn')} ${icon('chevron')}</a></h2>
          <ul class="plist">${ps.map(p => `<li><a href="#/problem/${p.id}">
            <span class="status ${progress.solved[p.id] ? 'done' : ''}">${progress.solved[p.id] ? icon('check') : ''}</span>
            <span class="pid">${pid(p)}</span><span class="ptitle">${esc(tr(p.title))}</span>${levelBadge(p.level)}${icon('chevron', 'go')}</a></li>`).join('')}</ul></section>`;
      }).join('') || `<p class="muted">—</p>`;
    };
    draw();
    $('#q', v).oninput = e => { practiceQuery = e.target.value; draw(); };
    v.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
      practiceFilter = b.dataset.f;
      v.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b));
      draw();
    });
    if (secFilter) {
      const s = SECTIONS.find(x => x.id === secFilter);
      if (s) $('h1', v).innerHTML = `<a href="#/practice">${t('navPractice')}</a> › ${esc(tr(s.title))}`;
    }
  }

  function filesHTML(names) {
    if (!names || !names.length) return '';
    return `<h3>${t('files')}</h3>
      <div class="tabs">${names.map((n, k) => `<button class="tab ${k ? '' : 'on'}" data-k="${k}">${esc(n)}</button>`).join('')}</div>
      <pre class="code file-view">${esc(fileHead(names[0]))}</pre>`;
  }
  const fileHead = n => { const ls = FILES[n].split('\n'); return ls.slice(0, 12).join('\n') + (ls.length > 13 ? `\n… (${ls.length - 1} lines)` : ''); };
  function wireFiles(v, names) {
    v.querySelectorAll('.tab').forEach(b => b.onclick = () => {
      v.querySelectorAll('.tab').forEach(x => x.classList.toggle('on', x === b));
      $('.file-view', v).textContent = fileHead(names[+b.dataset.k]);
    });
  }

  function verdictHTML(p, r) {
    if (r.ok) return `<div class="verdict ok">${icon('check')} ${t('accepted')}</div>`;
    let msg = t('r_' + r.reason) || '';
    if (r.reason === 'missing') msg = fill(t('r_missing'), { g: `<code>${esc(r.got)}</code>` });
    if (r.reason === 'assert') { const a = p.check.asserts[r.assert]; msg = a && a.msg ? tr(a.msg) : t('r_assert'); }
    return `<div class="verdict bad">${icon('x')} ${r.reason === 'error' ? t('error') : t('wrong')}<div class="small">${msg}${r.hidden ? ' ' + t('hiddenCase') : ''}</div></div>`;
  }
  function detailHTML(r) {
    const parts = [];
    if (r.error) parts.push(errorBox(r.error));
    if (!r.hidden && (r.reason === 'stdout' || r.reason === 'return' || r.reason === 'value')) {
      parts.push(`<div class="diff"><div><h4>${t('yourOutput')}</h4><pre class="stdout">${esc(r.got) || '&nbsp;'}</pre></div><div><h4>${t('expected')}</h4><pre class="stdout">${esc(r.exp)}</pre></div></div>`);
    } else if (!r.hidden && (r.stdout || (r.images || []).length) && r.reason !== 'error') {
      parts.push(`<h4>${t('yourOutput')}</h4>` + outputHTML({ stdout: r.stdout, images: r.images }));
    }
    return parts.join('');
  }

  function renderProblem(id) {
    const p = byId[id];
    if (!p) return renderPractice();
    const i = PROBLEMS.indexOf(p);
    const prev = PROBLEMS[i - 1], next = PROBLEMS[i + 1];
    const sec = PYC.sectionOf(p);
    const pack = needsPackSec(sec);
    const timeout = pack ? TIMEOUT_PACK : TIMEOUT;
    const nCases = p.check.type === 'function' ? (p.check.calls || [[]]).length : (p.cases || ['']).length;
    const setupFor = k => (p.setup || '') + '\n' + ((p.cases || [''])[k] || '');
    let hintsShown = 0;
    const v = view();
    v.innerHTML = `
      <nav class="crumbs"><a href="#/practice">${t('navPractice')}</a> › <a href="#/practice/${sec.id}">${sec.n}. ${esc(tr(sec.title))}</a></nav>
      <div id="gate"></div>
      <div class="prob-layout">
        <div class="prob-desc">
          <h1>${pid(p)} ${esc(tr(p.title))} ${progress.solved[p.id] ? `<span class="tick">${icon('check')}</span>` : ''}</h1>
          <div class="meta">${levelBadge(p.level)}<span class="muted small">${fill(t('tests'), { n: nCases })}</span></div>
          <div class="desc">${tr(p.desc)}</div>
          ${p.given ? `<div class="given"><h3>${t('given')}</h3>${tr(p.given)}</div>` : ''}
          ${filesHTML(p.files)}
          ${p.check.type !== 'function' ? `<details class="expected"><summary>${t('showExpected')}</summary><div id="expView"></div></details>` : ''}
          <div id="hints"></div>
          <div id="sol"></div>
        </div>
        <div class="prob-work">
          <div id="ed"></div>
          <div class="row actions">
            <button class="btn" id="runBtn">${icon('play', 'fill')} ${t('run')}</button>
            <button class="btn primary" id="subBtn">${icon('check')} ${t('submit')}</button>
            <button class="btn ghost" id="hintBtn">${icon('bulb')} ${t('hint')}</button>
            <button class="btn ghost" id="solBtn">${icon('key')} ${t('solution')}</button>
            <button class="btn ghost" id="rstBtn">${icon('reset')} ${t('reset')}</button>
          </div>
          <div class="muted small kbd">${t('shortcut')}</div>
          <div id="verdict"></div>
          <div id="out"></div>
        </div>
      </div>
      <div class="pager">
        ${prev ? `<a class="btn ghost" href="#/problem/${prev.id}">${icon('arrowLeft')} ${t('prev')}</a>` : '<span></span>'}
        <a class="btn ghost" href="#/practice">${t('backList')}</a>
        ${next ? `<a class="btn ghost" href="#/problem/${next.id}">${t('next')} ${icon('chevron')}</a>` : '<span></span>'}
      </div>`;
    gateInto($('#gate', v), sec);
    wireFiles(v, p.files);

    const solutionCode = loc(p.solution);
    const exp = $('details.expected', v);
    if (exp) exp.addEventListener('toggle', async e => {
      if (!e.target.open || $('#expView', v).innerHTML) return;
      if (pack && !(await ensurePack())) { e.target.open = false; return; }
      runInto($('#expView', v), { code: solutionCode, setup: setupFor(0), files: filesFor(p.files), stdin: p.stdin }, timeout);
    });

    const ed = createEditor($('#ed', v), progress.drafts[p.id] != null ? progress.drafts[p.id] : loc(p.starter), {
      minHeight: 180,
      onChange: val => { progress.drafts[p.id] = val; saveProgress(); },
      onRun: () => goRun()
    });
    const out = $('#out', v), verdict = $('#verdict', v);

    const goRun = runButton($('#runBtn', v), async () => {
      if (pack && !(await ensurePack())) return;
      verdict.innerHTML = '';
      await runInto(out, { code: ed.get(), setup: setupFor(0), files: filesFor(p.files), stdin: p.stdin }, timeout);
    });
    runButton($('#subBtn', v), async () => {
      if (pack && !(await ensurePack())) return;
      verdict.innerHTML = '';
      waiting(out);
      let r;
      try {
        r = await Engine.grade({ code: ed.get(), solution: PYC.loc(p.solution, 'en'), check: p.check, setup: p.setup || '', cases: p.cases, files: filesFor(p.files), stdin: p.stdin }, timeout);
      } catch (e) {
        out.innerHTML = `<div class="err">${t('engineFail')}<div class="small muted">${esc(e.message || e)}</div></div>`;
        return;
      }
      verdict.innerHTML = verdictHTML(p, r);
      out.innerHTML = detailHTML(r);
      if (!r.ok) return;
      out.insertAdjacentHTML('beforeend', `<div class="card explain"><b>${t('concepts')}:</b> ${tr(p.explain)}</div>`);
      if (!progress.solved[p.id]) {
        progress.solved[p.id] = true; saveProgress();
        celebrate();
        const h1 = $('h1', v);
        if (h1 && !$('.tick', h1)) h1.insertAdjacentHTML('beforeend', ` <span class="tick">${icon('check')}</span>`);
      }
      if (next) out.insertAdjacentHTML('beforeend', `<a class="btn primary" href="#/problem/${next.id}">${t('next')}: ${pid(next)} ${esc(tr(next.title))} ${icon('chevron')}</a>`);
    });
    $('#rstBtn', v).onclick = () => {
      delete progress.drafts[p.id]; saveProgress();
      ed.set(loc(p.starter)); out.innerHTML = ''; verdict.innerHTML = '';
    };
    $('#hintBtn', v).onclick = () => {
      if (hintsShown >= p.hints.length) { toast(t('noMoreHints')); return; }
      $('#hints', v).insertAdjacentHTML('beforeend', `<div class="hint">${icon('bulb')}<div><b>${t('hint')} ${hintsShown + 1}</b> ${tr(p.hints[hintsShown])}</div></div>`);
      hintsShown++;
    };
    $('#solBtn', v).onclick = () => {
      if ($('#sol', v).innerHTML) return;
      if (!progress.solved[p.id] && hintsShown < p.hints.length && !confirm(t('revealConfirm'))) return;
      $('#sol', v).innerHTML = `<div class="card solution"><h3 class="with-icon">${icon('key')} ${t('solution')}</h3>
        <pre class="code">${highlight(solutionCode)}</pre><p>${tr(p.explain)}</p>
        <button class="btn ghost" id="useSol">${icon('copy')} ${t('useSolution')}</button></div>`;
      $('#useSol', v).onclick = () => { ed.set(solutionCode); progress.drafts[p.id] = solutionCode; saveProgress(); };
    };
  }

  function celebrate() {
    toast(t('accepted') + '!', 'ok');
    const box = h('<div class="confetti" aria-hidden="true"></div>');
    const colors = ['#FFD43B', '#3572A5', '#BCE2F6', '#34C38F', '#F5A524'];
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('i');
      s.style.left = Math.random() * 100 + '%';
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = Math.random() * 0.3 + 's';
      s.style.transform = `rotate(${Math.random() * 360}deg)`;
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 1800);
  }

  const PLAY_DEFAULT = 'name = input("What is your name? ")\nfor i in range(3):\n    print(f"Hello, {name}! ({i + 1})")\n';
  let playDraft = store.get('playDraft', PLAY_DEFAULT);
  let playInput = store.get('playInput', 'Ada');
  function renderPlayground() {
    const v = view();
    const names = Object.keys(FILES);
    v.innerHTML = `<h1>${t('navPlay')}</h1><p class="muted">${t('playIntro')}</p>
      <div class="play-layout">
        <aside class="card schema-side"><h3>${t('files')}</h3>
          ${names.map(n => `<div class="side-tbl"><button class="link tname" data-n="${esc(n)}" title="${t('insert')}">${esc(n)}</button>
            <div class="small muted">${esc(FILES[n].split('\n')[0].slice(0, 60))}</div></div>`).join('')}
          <h3>${t('dataPack')}</h3><div id="packSide" class="small muted">…</div>
        </aside>
        <div>
          <div id="ed"></div>
          <label class="stdin"><span class="small muted">${t('input')}</span><textarea id="stdin" rows="2">${esc(playInput)}</textarea></label>
          <div class="row"><button class="btn primary" id="runBtn">${icon('play', 'fill')} ${t('run')}</button><button class="btn ghost" id="rstBtn">${icon('reset')} ${t('reset')}</button><span class="muted small kbd">${t('shortcut')}</span></div>
          <div id="out" class="out"></div>
        </div>
      </div>`;
    const out = $('#out', v);
    const go = runButton($('#runBtn', v), async () => {
      const code = ed.get();
      const pack = Engine.needsPack(code);
      if (pack && !(await ensurePack())) return;
      await runInto(out, { code, files: FILES, stdin: $('#stdin', v).value.split('\n') }, pack ? TIMEOUT_PACK : TIMEOUT);
    });
    const ed = createEditor($('#ed', v), playDraft, {
      minHeight: 200,
      onChange: val => { playDraft = val; store.set('playDraft', val); },
      onRun: go
    });
    $('#stdin', v).oninput = e => { playInput = e.target.value; store.set('playInput', playInput); };
    $('#rstBtn', v).onclick = () => { ed.set(''); playDraft = ''; store.set('playDraft', ''); out.innerHTML = ''; };
    v.querySelectorAll('.tname').forEach(b => b.onclick = () => {
      const n = b.dataset.n;
      const snippet = n.endsWith('.csv')
        ? `import pandas as pd\n\ndf = pd.read_csv("${n}")\nprint(df.head())\n`
        : `with open("${n}") as f:\n    print(f.read())\n`;
      ed.set(snippet); playDraft = snippet; store.set('playDraft', snippet);
      go();
    });
    const side = $('#packSide', v);
    Engine.packState().then(s => {
      if (s === 'ready') { side.textContent = t('packDone'); return; }
      side.innerHTML = `${fill(t('packNo'), { mb: packMB() })}<br><button class="btn small" id="packGo">${icon('download')} ${t('packBtn')}</button>`;
      $('#packGo', side).onclick = () => ensurePack().then(ok => { if (ok) side.textContent = t('packDone'); });
    });
  }

  function renderNext() {
    const N = PYC.NEXT;
    if (!N) return renderLearnIndex();
    view().innerHTML = `<nav class="crumbs"><a href="#/learn">${t('navLearn')}</a></nav>
      <h1 class="with-icon"><span class="sec-icon">${icon('compass')}</span>${t('nextSteps')}</h1>
      <div class="lead">${tr(N.intro)}</div>
      ${N.sections.map(s => `<article class="card lesson-card"><h3>${tr(s.title)}</h3><div class="body">${tr(s.body)}</div>
        ${s.code ? `<div class="muted small">${icon('info')} ${t('readOnly')}</div><pre class="code">${highlight(loc(s.code))}</pre>` : ''}</article>`).join('')}`;
  }

  // ---------------------------------------------------------------- appearance
  // Mode picks light or dark (or follows the phone); each side has its own theme.
  // index.html's prepaint script mirrors applyTheme() so nothing flashes on load.
  const THEMES = {
    light: [['classic', '#f6f8fb', '#ffffff', '#2f7fd0'], ['paper', '#f6f1e7', '#fffdf8', '#b4621b'],
      ['mint', '#eef7f3', '#ffffff', '#0d8466'], ['lavender', '#f5f3fc', '#ffffff', '#6a4fd3']],
    dark: [['midnight', '#0f141a', '#171e26', '#6cb3f5'], ['oled', '#000000', '#0d0d0d', '#6cb3f5'],
      ['slate', '#23272f', '#2c313b', '#83b9ec'], ['grape', '#17121f', '#221a2e', '#b89dff']]
  };
  const MODES = ['system', 'light', 'dark'];
  const prefs = Object.assign({ mode: 'system', light: 'classic', dark: 'midnight' }, store.get('prefs', {}));
  if (!MODES.includes(prefs.mode)) prefs.mode = 'system';
  if (!THEMES.light.some(x => x[0] === prefs.light)) prefs.light = 'classic';
  if (!THEMES.dark.some(x => x[0] === prefs.dark)) prefs.dark = 'midnight';
  const darkMQ = matchMedia('(prefers-color-scheme: dark)');

  function applyTheme() {
    const side = prefs.mode === 'system' ? (darkMQ.matches ? 'dark' : 'light') : prefs.mode;
    const name = prefs[side];
    const root = document.documentElement;
    root.dataset.theme = side;
    root.dataset.palette = name;
    const bg = THEMES[side].find(x => x[0] === name)[1];
    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute('content', bg));
  }
  function setPref(k, v) { prefs[k] = v; store.set('prefs', prefs); applyTheme(); }
  darkMQ.addEventListener('change', () => { if (prefs.mode === 'system') applyTheme(); });
  applyTheme();

  // ---------------------------------------------------------------- install
  // Chromium offers a native prompt; iOS Safari has none, so explain "Add to Home Screen" instead.
  let deferredPrompt = null;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; if (currentRoute === 'settings') render(); });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; if (currentRoute === 'settings') render(); });
  async function install() {
    if (!deferredPrompt) { showIOSInstall(); return; }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    render();
  }
  function showIOSInstall() {
    const m = modal(`<h2>${t('installApp')}</h2>${STR.iosInstall[lang]}<div class="right"><button class="btn primary">${t('close')}</button></div>`);
    $('button', m).onclick = () => m.remove();
  }
  function showAbout() {
    const m = modal(`<h2>${t('appName')}</h2>${STR.aboutBody[lang]}<div class="right"><button class="btn primary">${t('close')}</button></div>`);
    $('button', m).onclick = () => m.remove();
  }

  // ---------------------------------------------------------------- updates (APP-STANDARDS §1–2)
  const RELEASES = window.PY_RELEASES;
  const APP_URL = 'https://bryanwoo988.github.io/Learn-Python/';
  const firstLaunch = !store.get('launched', false) && store.get('progress', null) === null;
  store.set('launched', true);
  window.WhatsNew.init({
    version: RELEASES[0].v, releases: RELEASES, key: 'pysyntax.seenVersion',
    lang: () => lang, isNewUser: () => firstLaunch
  });

  let swReg = null, reloading = false;
  // The new service worker waits until the reader agrees; then it takes over and the page reloads once.
  function applyUpdate() {
    const w = swReg && swReg.waiting;
    if (!w) { location.reload(); return; }
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!reloading) { reloading = true; location.reload(); }
    });
    w.postMessage({ type: 'SKIP_WAITING' });
  }
  function track(w) {
    if (!w) return;
    w.addEventListener('statechange', () => {
      if (w.state !== 'installed') return;
      if (navigator.serviceWorker.controller) window.WhatsNew.offerUpdate(applyUpdate);
      else toast(t('offlineReady'));
    });
  }
  async function checkForUpdate(manual) {
    if (!swReg) { if (manual) toast(t('upToDate')); return; }
    try { await swReg.update(); } catch (e) { /* offline: try later */ }
    if (swReg.waiting && navigator.serviceWorker.controller) window.WhatsNew.offerUpdate(applyUpdate);
    else if (manual) toast(swReg.installing ? t('downloading') : t('upToDate'));
  }
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then(reg => {
        swReg = reg;
        if (reg.waiting && navigator.serviceWorker.controller) window.WhatsNew.offerUpdate(applyUpdate);
        track(reg.installing);
        reg.addEventListener('updatefound', () => track(reg.installing));
        // Home-screen apps are resumed far more often than relaunched: check on return and every 15 minutes.
        document.addEventListener('visibilitychange', () => { if (!document.hidden) checkForUpdate(false); });
        setInterval(() => checkForUpdate(false), 15 * 60e3);
      }).catch(() => { /* offline support unavailable */ });
    });
  }

  // ---------------------------------------------------------------- settings
  const segmented = (opts, cur, attr) => `<div class="seg wide" role="radiogroup">${opts.map(([v, label, ic]) =>
    `<button type="button" role="radio" aria-checked="${v === cur}" data-${attr}="${v}" class="${v === cur ? 'on' : ''}">${ic ? icon(ic) : ''}${label}</button>`).join('')}</div>`;
  const swatches = side => `<div class="swatches">${THEMES[side].map(([name, bg, surf, acc]) =>
    `<button type="button" class="swatch ${prefs[side] === name ? 'on' : ''}" data-side="${side}" data-name="${name}" aria-pressed="${prefs[side] === name}">
      <span class="sw-prev" style="background:${bg}"><span class="sw-card" style="background:${surf}"><i style="background:${acc}"></i><b></b></span></span>
      <span class="sw-name">${t('th_' + name)}</span></button>`).join('')}</div>`;

  function renderSettings() {
    const v = view();
    const installRow = standalone()
      ? `<p class="muted small">${t('installedNote')}</p>`
      : (deferredPrompt || isIOS)
        ? `<p class="muted small">${t('installHint')}</p><button class="btn primary" id="installBtn">${icon('download')} ${t('installApp')}</button>`
        : `<p class="muted small">${t('installHint')}</p>`;
    v.innerHTML = `<h1>${t('settings')}</h1>
      <section class="card setgroup">
        <h2 class="set-h">${icon('globe')} ${t('language')}</h2>
        ${segmented([['en', 'English'], ['zh', '中文']], lang, 'lang')}
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('palette')} ${t('appearance')}</h2>
        <h3>${t('mode')}</h3>
        ${segmented([['system', t('modeSystem'), 'monitor'], ['light', t('modeLight'), 'sun'], ['dark', t('modeDark'), 'moon']], prefs.mode, 'mode')}
        <p class="muted small">${t('themeNote')}</p>
        <h3>${t('lightTheme')}</h3>${swatches('light')}
        <h3>${t('darkTheme')}</h3>${swatches('dark')}
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('share')} ${t('share')}</h2>
        <div class="share-box">
          <div class="qr" id="qr" aria-label="${esc(APP_URL)}"></div>
          <div class="share-side">
            <p class="muted small">${t('shareHint')}</p>
            <p class="share-url">${esc(APP_URL)}</p>
            <div class="row">
              ${navigator.share ? `<button class="btn primary" id="shareBtn">${icon('share')} ${t('shareBtn')}</button>` : ''}
              <button class="btn ${navigator.share ? 'ghost' : 'primary'}" id="copyBtn">${icon('copy')} ${t('copyLink')}</button>
            </div>
          </div>
        </div>
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('download')} ${t('installApp')}</h2>
        ${installRow}
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('info')} ${t('info')}</h2>
        <dl class="keyval">
          <dt>${t('version')}</dt><dd>${esc(window.WhatsNew.label(RELEASES))}</dd>
          <dt>${t('offline')}</dt><dd id="offState">…</dd>
          <dt>${t('dataPack')}</dt><dd id="packState">…</dd>
        </dl>
        <div class="row">
          <button class="btn" id="histBtn">${icon('history')} ${t('history')}</button>
          <button class="btn" id="updBtn">${icon('refresh')} ${t('checkUpdate')}</button>
          <button class="btn ghost" id="aboutBtn">${icon('info')} ${t('about')}</button>
        </div>
      </section>
      <section class="card setgroup">
        <h2 class="set-h">${icon('trash')} ${t('progressData')}</h2>
        <button class="btn danger" id="resetBtn">${icon('trash')} ${t('resetProgress')}</button>
      </section>`;

    $('#qr', v).appendChild(window.QR.toSVG(APP_URL, { quiet: 4, dark: '#111827', light: '#ffffff' }));
    v.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => { lang = b.dataset.lang; store.set('lang', lang); render(); });
    v.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { setPref('mode', b.dataset.mode); render(); });
    v.querySelectorAll('.swatch').forEach(b => b.onclick = () => {
      // Picking a theme previews it right away, even if the mode shows the other side.
      if (prefs.mode !== 'system' && prefs.mode !== b.dataset.side) prefs.mode = b.dataset.side;
      setPref(b.dataset.side, b.dataset.name); render();
    });
    if ($('#shareBtn', v)) $('#shareBtn', v).onclick = () => navigator.share({ title: t('appName'), url: APP_URL }).catch(() => {});
    $('#copyBtn', v).onclick = async () => {
      try { await navigator.clipboard.writeText(APP_URL); toast(t('copied')); }
      catch (e) {
        const r = document.createRange(); r.selectNodeContents($('.share-url', v));
        getSelection().removeAllRanges(); getSelection().addRange(r);
      }
    };
    if ($('#installBtn', v)) $('#installBtn', v).onclick = install;
    $('#histBtn', v).onclick = () => window.WhatsNew.history();
    $('#updBtn', v).onclick = () => checkForUpdate(true);
    $('#aboutBtn', v).onclick = showAbout;
    $('#resetBtn', v).onclick = () => {
      if (!confirm(t('resetConfirm'))) return;
      progress.solved = {}; progress.lessons = {}; progress.drafts = {};
      saveProgress(); toast(t('resetProgress') + ' ✓');
    };
    const off = $('#offState', v);
    (window.caches ? caches.keys() : Promise.resolve([]))
      .then(keys => { const ok = keys.some(k => k.startsWith('py-syntax-') && !k.startsWith('py-syntax-pkgs-')) && !!navigator.serviceWorker?.controller; off.textContent = t(ok ? 'offlineYes' : 'offlineNo'); off.className = ok ? 'good' : 'muted'; })
      .catch(() => { off.textContent = t('offlineNo'); });
    const ps = $('#packState', v);
    Engine.packState().then(s => {
      if (s === 'ready') { ps.textContent = t('packDone'); ps.className = 'good'; return; }
      ps.innerHTML = `${fill(t('packNo'), { mb: packMB() })} <button class="btn small" id="packGo">${icon('download')} ${t('packBtn')}</button>`;
      $('#packGo', ps).onclick = () => ensurePack().then(ok => { if (ok) { ps.textContent = t('packDone'); ps.className = 'good'; } });
    }).catch(() => { ps.textContent = '—'; });
  }

  // ---------------------------------------------------------------- router & chrome
  let currentRoute = '';
  document.querySelectorAll('[data-icon]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));

  function applyChrome() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('appName');
    $('#brandName').textContent = t('appName');
    $('#settingsBtn').setAttribute('aria-label', t('settings'));
    document.querySelectorAll('[data-nav]').forEach(a => { a.querySelector('span').textContent = t(a.dataset.nav); });
  }

  function render() {
    applyChrome();
    // Leaving a page ends whatever it was running.
    if (Engine.busy()) Engine.stop();
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/');
    const route = parts[0] || '';
    currentRoute = route;
    document.querySelectorAll('[data-nav]').forEach(a => {
      const r = a.getAttribute('href').replace('#/', '');
      const on = r === route || (r === 'practice' && route === 'problem') || (r === 'learn' && route === 'next');
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('#settingsBtn').classList.toggle('on', route === 'settings');
    if (route === 'learn') parts[1] ? renderLesson(parts[1]) : renderLearnIndex();
    else if (route === 'practice') renderPractice(parts[1]);
    else if (route === 'problem') renderProblem(+parts[1]);
    else if (route === 'playground') renderPlayground();
    else if (route === 'next') renderNext();
    else if (route === 'settings') renderSettings();
    else renderHome();
  }

  window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
  render();
})();
