/* Course structure and the helpers the content files use.
   Chapter files call PYC.lesson(sectionId, {...}), PYC.add(problem) and PYC.file(name, text).

   Code comments are bilingual: a comment written  #: English text || 中文
   shows as  # English text  or  # 中文  depending on the reader's language
   (PYC.loc). Everything else in the code — names, strings, printed text, data —
   stays English, so one reference output grades both languages. */
(function (root) {
  'use strict';
  const T = (en, zh) => ({ en, zh });

  const PARTS = [
    { id: 'beginner', title: T('Beginner', '入门'), needsPack: false },
    { id: 'intermediate', title: T('Intermediate', '进阶'), needsPack: false },
    { id: 'data', title: T('Data analysis', '数据分析'), needsPack: true },
    { id: 'ml', title: T('Machine learning', '机器学习'), needsPack: true }
  ];

  const S = (n, id, part, en, zh, icon) => ({ n, id, part, title: T(en, zh), icon });
  const SECTIONS = [
    S(1, 'start', 'beginner', 'Getting Started', '入门', 'terminal'),
    S(2, 'types', 'beginner', 'Data Types & Operators', '数据类型与运算', 'hash'),
    S(3, 'strings', 'beginner', 'Strings', '字符串', 'text'),
    S(4, 'conditions', 'beginner', 'Conditions', '条件判断', 'branch'),
    S(5, 'loops', 'beginner', 'Loops', '循环', 'repeat'),
    S(6, 'lists', 'beginner', 'Lists & Tuples', '列表与元组', 'list'),
    S(7, 'dicts', 'beginner', 'Dictionaries & Sets', '字典与集合', 'braces'),
    S(8, 'functions', 'intermediate', 'Functions', '函数', 'func'),
    S(9, 'modules', 'intermediate', 'Errors & Modules', '错误处理与常用模块', 'shield'),
    S(10, 'files', 'intermediate', 'Files', '文件读写', 'file'),
    S(11, 'oop', 'intermediate', 'Classes & Objects', '面向对象', 'cube'),
    S(12, 'numpy', 'data', 'NumPy', 'NumPy', 'grid'),
    S(13, 'pandas', 'data', 'pandas', 'pandas', 'table'),
    S(14, 'plotting', 'data', 'Matplotlib', 'Matplotlib', 'chart'),
    S(15, 'stats', 'ml', 'Statistics Basics', '统计基础', 'sigma'),
    S(16, 'regression', 'ml', 'Regression', '回归', 'trend'),
    S(17, 'classify', 'ml', 'Classification & Clustering', '分类与聚类', 'target'),
    S(18, 'neural', 'ml', 'Neural Networks', '神经网络入门', 'brain')
  ];

  const LESSONS = {}, PROBLEMS = [], FILES = {};

  // Finds a "#:" comment that is outside any string on this line (single-line strings only).
  function commentAt(line) {
    let q = null;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (q) { if (c === '\\') i++; else if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if (c === '#') return line[i + 1] === ':' ? i : -1;
    }
    return -1;
  }

  function loc(code, lang) {
    if (typeof code !== 'string') return code;
    return code.split('\n').map(line => {
      const i = commentAt(line);
      if (i < 0) return line;
      const parts = line.slice(i + 2).split('||');
      const text = (lang === 'zh' && parts.length > 1 ? parts[1] : parts[0]).trim();
      return line.slice(0, i) + '# ' + text;
    }).join('\n');
  }

  const sectionOf = p => SECTIONS.find(s => s.id === p.section);
  const partOf = s => PARTS.find(p => p.id === s.part);

  root.PYC = {
    T, PARTS, SECTIONS, LESSONS, PROBLEMS, FILES, NEXT: null, loc, sectionOf, partOf,
    lesson(id, L) { LESSONS[id] = L; },
    add(p) { PROBLEMS.push(p); },
    file(name, text) { FILES[name] = text.replace(/^\n/, ''); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
