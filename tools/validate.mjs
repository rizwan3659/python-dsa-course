// Content validator: loads every topic/question/visualizer file the way the browser does, checks structure,
// then hands all Python (solutions, tests, predicted outputs, dry-run tables, lesson code) to check.py.
// Usage: node tools/validate.mjs            (needs python on PATH)
import fs from 'fs';
import path from 'path';
import {spawnSync} from 'child_process';
import {loadCourse, root} from './load-course.mjs';

const {C, problems} = loadCourse();
const qs = C.questions;
const TYPES = Object.keys(C.TYPES);

// ---- structure checks ----
const seen = new Set();
for (const q of qs) {
  const at = `${q.id}`;
  if (seen.has(q.id)) problems.push(`duplicate id ${q.id}`); seen.add(q.id);
  if (!q.title) problems.push(`${at}: missing title`);
  if (!TYPES.includes(q.type)) problems.push(`${at}: bad type ${q.type}`);
  if (![1, 2, 3].includes(q.d)) problems.push(`${at}: d must be 1-3`);
  if (q.p && !C.PATTERNS[q.p]) problems.push(`${at}: unknown pattern ${q.p}`);
  if (!C.tmap[q.topic]) problems.push(`${at}: unknown topic ${q.topic}`);
  const opts = q.opts || (q.type === 'complexity' ? ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'] : null);
  if (['mcq', 'choose', 'complexity', 'debug'].includes(q.type) || (q.type === 'predict' && q.opts)) {
    const ai = typeof q.a === 'number' ? q.a : opts ? opts.indexOf(q.a) : -1;
    if (!opts || ai < 0 || ai >= opts.length) problems.push(`${at}: answer not among options`);
    if (!q.why) problems.push(`${at}: missing why`);
  }
  if (q.type === 'predict' && !q.code) problems.push(`${at}: predict needs code`);
  if (q.type === 'predict' && !q.opts && typeof q.a !== 'string') problems.push(`${at}: typed predict needs string a`);
  if (q.type === 'dryrun' && (!q.cols || !q.rows || q.rows.some(r => r.length !== q.cols.length))) problems.push(`${at}: dryrun rows/cols mismatch`);
  if (q.type === 'blanks') { const n = (q.code.match(/_{4,}/g) || []).length; if (n !== q.blanks.length) problems.push(`${at}: ${n} blanks but ${q.blanks.length} answers`); }
  if (q.type === 'code' && (!q.tests || !q.tests.length || !q.solution)) problems.push(`${at}: code needs tests + solution`);
}
// lesson references
const lessonCode = [];
const walk = (blocks, where) => (blocks || []).forEach((b, i) => {
  const w = `${where}[${i}]`;
  if (b.t === 'q') b.ids.forEach(id => { if (!C.qmap[id]) problems.push(`${w}: unknown question ${id}`); });
  if (b.t === 'viz' && !C.viz[b.fn]) problems.push(`${w}: unknown visualizer ${b.fn}`);
  if (b.t === 'b2o') { if (b.qid && !C.qmap[b.qid]) problems.push(`${w}: unknown qid ${b.qid}`); lessonCode.push({where: w + ' brute', code: b.brute.code, compileOnly: true}); lessonCode.push({where: w + ' optimal', code: b.optimal.code, compileOnly: true}); }
  if (b.t === 'code' && b.run !== false && (!b.lang || b.lang === 'python')) lessonCode.push({where: w, code: b.code, prelude: b.prelude});
});
for (const t of C.topics) {
  t.learn.forEach((l, i) => walk(l.blocks, `${t.id}.learn${i + 1}`));
  ['visualize', 'challenge', 'review'].forEach(k => walk(t[k], `${t.id}.${k}`));
}
C.vizMeta.forEach(v => { if (!C.tmap[v.topic]) problems.push(`viz ${v.name}: unknown topic ${v.topic}`); });

// ---- python checks ----
const tmp = path.join(root, 'tools', '.content.json');
fs.writeFileSync(tmp, JSON.stringify({questions: qs, preludes: C.PRELUDES, lessonCode}));
const py = spawnSync(process.platform === 'win32' ? 'python' : 'python3', [path.join(root, 'tools', 'check.py'), tmp], {encoding: 'utf8', maxBuffer: 1 << 26});
fs.unlinkSync(tmp);
if (py.error) problems.push('could not run python: ' + py.error.message);
const pyOut = (py.stdout || '') + (py.stderr || '');
const pyProblems = pyOut.split('\n').filter(l => l.startsWith('FAIL') || l.startsWith('WARN'));

// ---- report ----
const by = {};
qs.forEach(q => { by[q.topic] = by[q.topic] || {n: 0, code: 0, types: {}}; by[q.topic].n++; by[q.topic].types[q.type] = (by[q.topic].types[q.type] || 0) + 1; });
console.log('Questions per topic:');
C.topics.forEach(t => { const b = by[t.id] || {n: 0, types: {}}; console.log(`  ${String(t.n).padStart(2)} ${t.id.padEnd(11)} ${String(b.n).padStart(4)}   lessons ${t.learn.length}   ${Object.entries(b.types).map(([k, v]) => k + ':' + v).join(' ')}`); });
console.log(`  total ${qs.length} questions · ${C.vizMeta.length} visualizers`);
console.log(pyOut.split('\n').filter(l => l.startsWith('OK')).join('\n'));
const fails = problems.concat(pyProblems.filter(l => l.startsWith('FAIL')));
pyProblems.filter(l => l.startsWith('WARN')).forEach(l => console.log(l));
fails.forEach(p => console.log('FAIL', p.replace(/^FAIL\s*/, '')));
console.log(fails.length ? `\n${fails.length} problem(s)` : '\nAll content checks passed.');
process.exit(fails.length ? 1 : 0);
