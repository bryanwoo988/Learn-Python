# Release rule

Every change that ships to users adds an entry at the top of `js/releases.js`:
the new version number, today's date (YYYY-MM-DD), and what changed in plain
words for users, in English and Chinese. Then set `VERSION` in `sw.js` to the
same number — that is what makes installed copies download the update — and run
`node tools/check-release.mjs` before pushing.

After the update the app asks before reloading ("A new version is available"),
then shows these notes once. Settings shows the current version and the full history.

Version numbers: bug fixes bump the last digit, new features the middle one.

The service worker may only delete caches starting with `py-syntax-`: every app
on bryanwoo988.github.io shares one cache storage. The data-pack cache
(`py-syntax-pkgs-<pyodide version>`) must survive app updates.

Before pushing content changes also run `node tools/check-content.mjs` and
`node tools/check-problems.mjs` (every reference solution passes, every starter fails).

Shared standard for all of Bryan Woo's apps (including new ones):
https://github.com/bryanwoo988/woobrothers.my/blob/main/APP-STANDARDS.md
