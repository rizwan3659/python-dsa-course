// Loads every topic/question/visualizer file into a sandbox the way the browser does and returns window.COURSE.
// Shared by tools/validate.mjs and tools/export-python.mjs.
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import {fileURLToPath} from 'url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function loadCourse() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
  const want = s => s === 'js/core.js' || s === 'js/player.js' || /^(topics|questions|viz)\//.test(s);

  const noop = () => {};
  const el = () => ({addEventListener: noop, appendChild: noop, querySelector: () => null, classList: {toggle: noop, add: noop}});
  const ctx = {console, Math, JSON, Date, setTimeout, clearTimeout, setInterval, clearInterval,
    document: {addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], createElement: el},
    localStorage: {getItem: () => null, setItem: noop, removeItem: noop}, URL: {createObjectURL: () => ''}, Blob: function () {}};
  ctx.window = ctx;
  vm.createContext(ctx);
  const problems = [];
  for (const s of scripts.filter(want)) {
    const f = path.join(root, s);
    if (!fs.existsSync(f)) { problems.push(`missing file ${s}`); continue; }
    try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, {filename: s}); }
    catch (e) { problems.push(`${s}: ${e.message}`); }
  }
  return {C: ctx.COURSE, problems};
}
