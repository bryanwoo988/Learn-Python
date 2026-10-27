// Loads the content scripts the way index.html does, for the tools/ checks.
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('..', import.meta.url).pathname;
export const CONTENT = ['js/icons.js', 'js/errors.js', 'js/content/core.js', 'js/content/beginner.js', 'js/content/intermediate.js', 'js/content/data.js', 'js/content/ml.js'];

export function loadContent() {
  const ctx = { console };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of CONTENT) if (existsSync(root + f)) vm.runInContext(readFileSync(root + f, 'utf8'), ctx, { filename: f });
  return ctx;
}
