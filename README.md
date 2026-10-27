# Python Syntax · Python语言

An interactive, bilingual (English / 中文) Progressive Web App that teaches Python from zero to
data analysis and machine learning. The chapter order follows the
[W3Schools Python tutorial](https://www.w3schools.com/python/); every explanation, example,
dataset and problem is written for this app.

**Live app:** https://bryanwoo988.github.io/Learn-Python/

## Features
- **18 chapters in 4 parts** — Beginner (1–7), Intermediate (8–11), Data analysis (12–14: NumPy, pandas, matplotlib),
  Machine learning (15–18: statistics, regression, classification & clustering, neural networks) — plus a
  "What to learn next" page (TensorFlow, PyTorch, YOLO, Google Colab). Every example can be edited and run;
  each chapter ends with a short quiz.
- **83 practice problems** with Run / Submit, hints that unlock one at a time, a reference solution with
  explanation, and hidden tests. Answers are checked by output, return values, variables, DataFrames,
  chart contents or model accuracy.
- **Playground** with sample CSV files and an Input box for `input()`.
- Beginner-friendly error messages: the traceback shows only your lines, with a one-line explanation in your language.
- Code comments follow the chosen language; code, output, data and charts stay in English.
- **Settings** (gear icon): language, System/Light/Dark mode with 4 light and 4 dark themes, QR code and share link,
  install, data-library status, version and update history.
- **Works offline.** Python 3.14 runs in the browser through [Pyodide](https://pyodide.org) 314.0.7 in a Web Worker,
  so a run that never ends is stopped (Stop button, 10 s / 40 s timeout) without freezing the page.
  The core (≈13.5 MB) is cached on install; the data libraries numpy, pandas, matplotlib, scipy and
  scikit-learn (≈36 MB) download once, only when first needed. Nothing is sent to a server.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
Any static host works (GitHub Pages: Settings → Pages → deploy from branch, root folder).

## Checks
```bash
node tools/check-release.mjs     # version, release notes, precached and data-pack files
node tools/check-content.mjs     # every chapter, quiz and problem complete in both languages
node tools/test-runtime.mjs      # the Python runner and grader
node tools/check-problems.mjs    # every lesson example runs; every solution passes, every starter fails
node tools/smoke.mjs             # browser test with Playwright (Run/Stop, data pack, offline, layout)
```

## Releasing
Add an entry to the top of `js/releases.js`, set the same `VERSION` in `sw.js`, then run the checks. See `CLAUDE.md`.
To update Pyodide: download the release tarball, run `node tools/vendor-pyodide.mjs <tarball>`, and update
`PYODIDE` in `sw.js` and `PKGS_CACHE` in `js/engine.js`.

## Structure
| Path | Purpose |
|---|---|
| `index.html`, `css/style.css` | App shell and styles |
| `js/app.js` | Router, views, editor, running and grading UI, data-pack download, settings |
| `js/engine.js`, `js/py-worker.js` | Python worker (Pyodide), stop/timeout, data-pack download |
| `py/runtime.py` | Runs and grades code in a fresh namespace and folder; figures; error cleanup |
| `js/content/core.js` | Chapters, content helpers, bilingual comments (`#: English \|\| 中文`) |
| `js/content/{beginner,intermediate,data,ml}.js` | Lessons, quizzes, problems and sample files |
| `js/errors.js` | Plain-language error explanations |
| `js/releases.js`, `js/whatsnew.js` | Release notes and the shared what's-new / update bar |
| `js/icons.js`, `js/qrcode.js` | SVG icons, offline QR encoder |
| `sw.js`, `manifest.webmanifest`, `icons/` | PWA / offline support |
| `vendor/pyodide/` | Pyodide 314.0.7 core and the data-pack wheels (`pack.json`) |
| `tools/` | Checks, vendoring and icon scripts |

Third-party software in `vendor/pyodide/` (Pyodide, CPython, numpy, pandas, matplotlib, scipy, scikit-learn and
their dependencies) keeps its own licences.
