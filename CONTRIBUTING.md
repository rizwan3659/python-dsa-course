# Contributing

Thanks for helping! The course is plain files with no build step. Content is written once in JavaScript data files and checked in real Python.

## Setup

You need Python 3.10+ and Node.js 18+ (Node only for the content tools).

```bash
python -m pip install -r requirements.txt
python -m http.server 8000      # browser course at http://localhost:8000
```

## Where things live

| You want to change | Edit |
|---|---|
| A lesson | `topics/NN-name.js` |
| A question or coding exercise | `questions/NN-name.js` (or `questions/builds.js` for build-from-scratch) |
| A visualizer | `viz/*.js` |
| The local practice CLI | `dsa_course/` |
| The Top 100 interview roadmap | `questions/roadmap.js` |
| A mini-project | `projects/NN_name/` (README, starter, reference, tests) |
| Interview or instructor handbooks | `docs/interview/*.md` (except `top-100.md`), `docs/instructor/README.md` |

**Never edit generated files by hand:** `exercises/`, `solutions/`, `dsa_course/data/`, `dsa_course/preludes/` (from `tools/export-python.mjs`), and `notebooks/`, `curriculum/syllabus.md`, `docs/interview/top-100.md`, `docs/instructor/NN_*.md`, `docs/instructor/topics.md` (from `tools/export-docs.mjs`).

## Adding a coding exercise

Add an object to the topic's question file:

```js
{id:'arr-find-max', type:'code', d:1, p:'traversal', title:'Find Maximum',
 prompt:'<p>Return the largest number in a non-empty list without using <code>max()</code>.</p>',
 starter:`def find_max(nums):
    # your code here
    pass`,
 solution:`def find_max(nums):
    ...`,
 tests:[['find_max([3, 9, 2])', '9'], ['find_max([-5, -2, -9])', '-2'], ['find_max([7])', '7'], ...],
 hints:['First nudge.', 'Bigger nudge.'], approach:'One-line approach.', cx:'O(n) time, O(1) space'}
```

Rules:

- **The id is permanent.** It names the exercise file, the solution file, the pytest id and saved progress. Use `<topic prefix>-<slug>`; never rename or reuse one.
- `d` is 1 (easy), 2 (medium) or 3 (hard). `p` must be a key of `C.PATTERNS` in `js/core.js`.
- Give **at least four tests** (the validator enforces it). The first three are shown to the student as examples; the rest are hidden until they ask. Include edge cases (empty input, one element, duplicates, negatives).
- A test is `[call, expected]`, optionally `[call, expected, mode, label]`. `mode` can be `unordered`, `groups`, `float` or `check` (expected is a lambda). `label` replaces the call in messages, which is useful for class-based exercises.
- The starter must **fail** the tests and the solution must **pass** them. The validator checks both.
- Write for beginners: short sentences, clear names, type hints in new solutions, PEP 8.
- Linked-list and tree exercises set `prelude:'list'` or `prelude:'tree'` to get `ListNode`/`build`/`to_list` or `TreeNode`/`build_tree`/`tree_to_list`.

### Schema v2 fields

Every coding problem (except build-from-scratch challenges) must also have these fields; the validator rejects it otherwise (`prereq` and `dry` are optional):

```js
prereq:['arr-max-subarray'],                 // question or topic ids to do first
constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>'], // shown before the editor
dry:`n = 123: ...`,                           // a short worked trace, shown with the solution
mistakes:['Starting best at 0 when all values are negative.'],
followup:'Solve it in O(1) extra space.'      // a harder variation
```

They also need at least 4 tests and two hints plus an `approach` (three hint levels). The browser shows the first three tests as "Examples" automatically.

## Adding a mini-project

Create `projects/NN_name/` with `README.md` (sections *Requirements*, *Milestones*, *Extensions*), `starter.py` with TODOs, `reference.py`, and `test_name.py` whose tests use the `impl` fixture and are grouped in `TestMilestone1..3` classes. `tests/test_projects.py` checks that the reference passes and the starter fails.

## Before you open a pull request

```bash
node tools/validate.mjs              # structure + every snippet, solution and test in real Python
node tools/export-python.mjs         # regenerate the local practice track
node tools/export-docs.mjs           # regenerate notebooks, syllabus, Top 100 and instructor guides
python -m pytest                     # solutions, starters, runner, CLI, projects and notebooks
```

All four must pass. Commit the regenerated files together with your change; CI runs both generators with `--check` and fails if you forgot.

## Style

- Python: PEP 8, 4 spaces, descriptive names, no third-party dependencies in exercises.
- JavaScript: match the surrounding file (compact data objects, no frameworks).
- Explain complexity in words a beginner can follow, and make sure it is correct.
