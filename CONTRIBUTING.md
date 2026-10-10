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

**Never edit `exercises/`, `solutions/`, `dsa_course/data/` or `dsa_course/preludes/` by hand.** They are generated from `questions/*.js`.

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
- Give **at least four tests**. The first three are shown to the student as examples; the rest are hidden until they ask. Include edge cases (empty input, one element, duplicates, negatives).
- A test is `[call, expected]`, optionally `[call, expected, mode, label]`. `mode` can be `unordered`, `groups`, `float` or `check` (expected is a lambda). `label` replaces the call in messages, which is useful for class-based exercises.
- The starter must **fail** the tests and the solution must **pass** them. The validator checks both.
- Write for beginners: short sentences, clear names, type hints in new solutions, PEP 8.
- Linked-list and tree exercises set `prelude:'list'` or `prelude:'tree'` to get `ListNode`/`build`/`to_list` or `TreeNode`/`build_tree`/`tree_to_list`.

## Before you open a pull request

```bash
node tools/validate.mjs              # structure + every snippet, solution and test in real Python
node tools/export-python.mjs         # regenerate the local practice track
python -m pytest                     # reference solutions, starters, runner and CLI tests
```

All three must pass. Commit the regenerated files together with your change. `node tools/export-python.mjs --check` tells you if you forgot.

## Style

- Python: PEP 8, 4 spaces, descriptive names, no third-party dependencies in exercises.
- JavaScript: match the surrounding file (compact data objects, no frameworks).
- Explain complexity in words a beginner can follow, and make sure it is correct.
