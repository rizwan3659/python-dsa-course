// Exports the browser question bank as a local Python practice track (one source of truth, no duplication):
//   exercises/NN_topic/<id>.py      starter file the student edits (never overwritten once changed)
//   solutions/NN_topic/<id>.py      reference solution
//   dsa_course/data/exercises.json  metadata, hints and tests used by `python dsa.py` and pytest
//   dsa_course/preludes/*.py        helper classes (ListNode, TreeNode, ...) shared by exercises
// Usage: node tools/export-python.mjs           write the files
//        node tools/export-python.mjs --check   exit 1 if anything generated is out of date
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {loadCourse, root} from './load-course.mjs';

const CHECK = process.argv.includes('--check');
const {C, problems} = loadCourse();
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

const DIFF = {1: 'easy', 2: 'medium', 3: 'hard'};
const DIFF_ORDER = {easy: 0, medium: 1, hard: 2};
const PRELUDE_IMPORTS = {
  list: 'from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401',
  tree: 'from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401',
};
const PRELUDE_FILES = {list: 'linked_list.py', tree: 'tree.py'};
const VISIBLE = 3;

const lf = s => String(s).replace(/\r\n/g, '\n');
const sha = s => crypto.createHash('sha256').update(lf(s), 'utf8').digest('hex');
const modName = id => id.replace(/-/g, '_');
const topicDir = t => `${String(t.n).padStart(2, '0')}_${t.id}`;

// HTML prompt -> plain text paragraphs (<pre> blocks kept verbatim)
function htmlToText(h) {
  if (!h) return '';
  const pres = [];
  h = h.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, (_, body) => `\n\n@@PRE${pres.push(body) - 1}@@\n\n`);
  const t = h.replace(/<\/p>\s*/g, '\n\n').replace(/<p[^>]*>/g, '').replace(/<br\s*\/?>/g, '\n')
    .replace(/<li>/g, '\n- ').replace(/<\/?(ul|ol|li)>/g, '')
    .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`').replace(/<[^>]+>/g, '');
  const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  return unesc(t).replace(/@@PRE(\d+)@@/g, (_, i) => unesc(pres[+i]).replace(/<[^>]+>/g, '')).replace(/\n{3,}/g, '\n\n').trim();
}

function wrap(text, width = 76) {
  return text.split('\n').map(line => {
    if (line.length <= width || /^\s/.test(line)) return line;
    const bullet = line.startsWith('- ') ? '  ' : '';
    const out = [];
    let cur = '';
    for (const w of line.split(' ')) {
      if (cur && (cur + ' ' + w).length > width) { out.push(cur); cur = bullet + w; } else cur = cur ? cur + ' ' + w : w;
    }
    if (cur) out.push(cur);
    return out.join('\n');
  }).join('\n');
}

const docEscape = s => s.replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\"');
const indent = (s, pad = '    ') => s.split('\n').map(l => (l ? pad + l : l)).join('\n');
const label = t => t.label || `${t.call}  ->  ${t.expected}`;
// After the docstring: one blank line before an import, two before the first def/class (PEP 8).
const withImport = (code, prelude) => (PRELUDE_IMPORTS[prelude] ? '\n' + PRELUDE_IMPORTS[prelude] + '\n\n\n' : '\n\n') + lf(code).replace(/\s+$/, '') + '\n';

function toExercise(q) {
  const t = C.tmap[q.topic];
  const debug = q.type === 'debug';
  const kind = debug ? 'debug' : q.build ? 'build' : q.kind === 'optimize' ? 'optimize' : 'code';
  const tests = q.tests.map(([call, expected, mode, lbl]) => ({call, expected, mode: mode || '', label: lbl || ''}));
  let prompt = htmlToText(q.prompt);
  let hints = (q.hints || []).slice();
  if (debug) {
    prompt = 'This code has a bug. The tests below describe what it should do. Run the tests, find the bug and fix it.';
    hints = ['Run `python dsa.py test ' + q.id + '` and compare the first failing case with what you expected.', q.opts[q.a], htmlToText(q.why)];
  }
  if (q.req) prompt += '\n\nRequirements:\n' + q.req.map(r => '- ' + htmlToText(r)).join('\n');
  const approach = debug ? '' : htmlToText(q.approach || '');
  const levels = hints.map(htmlToText).filter(Boolean);
  if (approach) levels.push('Approach: ' + approach);
  return {
    id: q.id, module: modName(q.id), topic: t.id, dir: topicDir(t), title: q.title,
    difficulty: DIFF[q.d], pattern: C.PATTERNS[q.p] || q.p || '', kind,
    prompt, hints: levels, cx: debug ? '' : (q.cx || ''),
    prelude: q.prelude || '', post: q.post || '', tests,
    visible: debug ? tests.length : Math.min(VISIBLE, tests.length),
    starter: lf(debug ? q.code : q.starter), solution: lf(debug ? q.fix : q.solution),
  };
}

function exerciseFile(e) {
  const t = C.tmap[e.topic];
  const shown = e.tests.slice(0, e.visible).map(label);
  const hidden = e.tests.length - e.visible;
  const head = [
    `${e.id} · ${e.title}`,
    `Topic ${t.n}: ${t.title} · ${e.difficulty} · ${e.pattern}${e.kind !== 'code' ? ' · ' + e.kind : ''}`,
    '',
    wrap(e.prompt),
    '',
    'Examples:',
    indent(shown.join('\n')),
  ];
  if (hidden > 0) head.push('', `(${hidden} more hidden test${hidden > 1 ? 's' : ''} run when you check your work.)`);
  if (e.cx) head.push('', `Target complexity: ${e.cx}`);
  head.push('', 'Check your work:   python dsa.py test ' + e.id, 'Stuck?             python dsa.py hint ' + e.id);
  return `"""${docEscape(head.join('\n'))}\n"""\n${withImport(e.starter, e.prelude)}`;
}

function solutionFile(e) {
  const head = [`Reference solution · ${e.id} · ${e.title}`];
  if (e.cx) head.push('', `Complexity: ${e.cx}`);
  const approach = e.hints.find(h => h.startsWith('Approach: '));
  if (approach) head.push('', wrap(approach));
  return `"""${docEscape(head.join('\n'))}\n"""\n${withImport(e.solution, e.prelude)}`;
}

// ---- build everything in memory ----
const exercises = C.questions
  .filter(q => (q.type === 'code' && q.tests && q.solution) || (q.type === 'debug' && q.tests && q.fix))
  .map(toExercise)
  // course order by topic, then coding exercises easiest first, then debugging ones
  .sort((a, b) => C.tmap[a.topic].n - C.tmap[b.topic].n || (a.kind === 'debug') - (b.kind === 'debug') || DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]);
const files = new Map();  // relative path -> content
const exerciseFiles = new Map();
for (const e of exercises) {
  const ex = exerciseFile(e);
  e.path = `exercises/${e.dir}/${e.module}.py`;
  e.solution_path = `solutions/${e.dir}/${e.module}.py`;
  e.starter_sha256 = sha(ex);
  exerciseFiles.set(e.path, ex);
  files.set(e.solution_path, solutionFile(e));
  delete e.starter; delete e.solution;
}
const dirs = [...new Set(exercises.map(e => e.dir))];
for (const d of dirs) {
  files.set(`exercises/${d}/__init__.py`, '');
  files.set(`solutions/${d}/__init__.py`, '');
}
for (const [k, name] of Object.entries(PRELUDE_FILES)) {
  files.set(`dsa_course/preludes/${name}`, `"""Helpers shared by exercises (generated from js/core.js PRELUDES.${k})."""\n${lf(C.PRELUDES[k]).replace(/^from collections import deque\n/, 'from collections import deque\n\n')}\n`);
}
files.set('dsa_course/preludes/__init__.py', '');
const topics = C.topics.map(t => ({id: t.id, n: t.n, title: t.title, part: t.part, dir: topicDir(t)}));
const data = {generated_by: 'tools/export-python.mjs', preludes: Object.fromEntries(Object.keys(PRELUDE_FILES).map(k => [k, lf(C.PRELUDES[k])])), topics, exercises};
files.set('dsa_course/data/exercises.json', JSON.stringify(data, null, 1) + '\n');

// ---- write or check ----
// Read the previous starter hashes BEFORE rewriting exercises.json: an edited exercise is never overwritten.
const prevData = fs.existsSync(path.join(root, 'dsa_course/data/exercises.json'))
  ? JSON.parse(fs.readFileSync(path.join(root, 'dsa_course/data/exercises.json'), 'utf8')) : {exercises: []};
const prevSha = new Map(prevData.exercises.map(e => [e.path, e.starter_sha256]));
const stale = [];
const write = (rel, content) => {
  const f = path.join(root, rel);
  const old = fs.existsSync(f) ? lf(fs.readFileSync(f, 'utf8')) : null;
  if (old === content) return;
  stale.push(rel);
  if (!CHECK) { fs.mkdirSync(path.dirname(f), {recursive: true}); fs.writeFileSync(f, content); }
};
for (const [rel, content] of files) write(rel, content);
let kept = 0;
for (const [rel, content] of exerciseFiles) {
  const f = path.join(root, rel);
  if (fs.existsSync(f)) {
    const cur = sha(fs.readFileSync(f, 'utf8'));
    if (cur !== sha(content) && cur !== prevSha.get(rel)) { kept++; continue; }
  }
  write(rel, content);
}

const n = k => exercises.filter(e => e.kind === k).length;
console.log(`${exercises.length} exercises (${n('code')} code, ${n('optimize')} optimize, ${n('build')} build, ${n('debug')} debug) in ${dirs.length} topics`);
if (kept) console.log(`${kept} edited exercise file(s) left untouched`);
if (CHECK) {
  if (stale.length) { console.log(`${stale.length} generated file(s) out of date, e.g. ${stale.slice(0, 5).join(', ')}\nRun: node tools/export-python.mjs`); process.exit(1); }
  console.log('Generated Python track is up to date.');
} else console.log(`${stale.length} file(s) written`);
