# Python DSA Lab

[![CI](https://github.com/rizwan3659/python-dsa-course/actions/workflows/ci.yml/badge.svg)](https://github.com/rizwan3659/python-dsa-course/actions/workflows/ci.yml)

A hands-on data structures and algorithms course in Python, from basic Python to confident medium-level interview problems, with an advanced track for hard ones. It is built around **doing**, not reading: short explanations, then you predict, visualize, dry-run, code, debug, optimize and revise (about 30% explanation, 70% problem solving).

**Open the course:** https://rizwan3659.github.io/python-dsa-course/

No install, no account, no build step. Coding exercises run real Python in your browser with [Pyodide](https://pyodide.org), inside a Web Worker that can be stopped, so no server ever runs your code. Progress is saved in the browser and can be exported.

## What is inside

| | |
|---|---|
| **23 topics, 140 lessons** | Python → Big-O → Algorithmic Thinking → Arrays → Strings → Hashing → Stack → Queue → Linked Lists → Recursion & Backtracking → Searching → Sorting → Trees → BST → Heap → Trie → Graphs → Advanced Graphs → Greedy → Dynamic Programming → Bit Manipulation → Range Queries → Problem-Solving Patterns ([syllabus](curriculum/syllabus.md), [roadmap](curriculum/roadmap.md)) |
| **1,103 questions** | predict the output, concept, complexity, choose the data structure, dry-run tables, complete the code, debug, and **367 coding problems** with tests: every solution, prediction and table is verified in real Python |
| **44 visualizers** | step through algorithms: sorting, binary search, stacks and queues, linked lists, recursion trees, tree traversals, BFS/DFS, Dijkstra, DP tables, bitwise operations, Fenwick and segment trees, and more |
| **449 local exercises** | the same coding, build and debugging exercises as plain Python files with a test runner, hints and progress tracking |
| **10 mini-projects** | leaderboard, browser history, ticket queue, contact search, task scheduler, maze solver, route finder, autocomplete, LRU cache, recommendations ([projects](projects/)) |
| **Interview preparation** | a Top 100 roadmap in three tracks, timed rounds, pattern guide, communication guide, mock interview scripts ([docs/interview](docs/interview/)) |
| **Instructor material** | a guide for every topic plus rubrics ([docs/instructor](docs/instructor/)) |
| **Jupyter notebooks** | every topic's lessons as a runnable notebook ([notebooks](notebooks/)) |

Every coding problem has constraints, at least three examples plus hidden tests, three hint levels, common mistakes and a follow-up challenge (many also have prerequisites and a worked dry run). Solutions are never shown until you ask (twice).

## Pages

- **Learn**: the curriculum map. Each topic has *Learn* (short lessons that alternate explanation with exercises), *Visualize*, *Practice*, *Challenge* and *Review* tabs, plus a 60-minute session timer.
- **Practice**: the Practice Arena, filterable by topic, difficulty (🟢 🟡 🔴), pattern, type and status. Also **Today's Practice**: 8 problems a day.
- **Visualize**: every visualizer in one gallery.
- **Challenges**: build-from-scratch data structures, brute force → optimal walkthroughs, hard problems.
- **Interview**: timed rounds (20/35/45 minutes, no hints) with a debrief, and the **Top 100 roadmap** with your progress per track.
- **Revision**: wrong answers come back after 1, 2, 4 and 8 days (spaced repetition).
- **Progress**: topic mastery, streak, achievements, activity, export/import.

## Run it locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Practise in your own editor (local Python track)

Every runnable exercise is also a plain Python file you can solve in VS Code, PyCharm or any editor. You need Python 3.10+ and nothing else.

```bash
git clone https://github.com/rizwan3659/python-dsa-course.git
cd python-dsa-course
python dsa.py list arrays            # exercises in a topic, with your status
```

Open the exercise file, e.g. `exercises/04_arrays/arr_find_max.py`, replace the `pass` with your code, then:

```bash
python dsa.py test arr-find-max      # run the tests: visible ones in full, hidden ones on request (--reveal)
python dsa.py hint arr-find-max      # one more hint each time (hint 1 → hint 2 → approach)
python dsa.py progress               # progress per topic and difficulty, weak topics, what to do next
python dsa.py solution arr-find-max  # the reference solution, after you have really tried
```

Your code runs in a separate Python process with a time limit (and a memory limit on Linux and macOS), so an infinite loop just reports a timeout. Progress is saved in `.dsa_progress.json` (not committed). With pytest installed (`pip install -r requirements.txt`), `pytest tests/test_my_solutions.py` checks every exercise you have edited.

Projects work the same way: `python -m pytest projects/01_leaderboard -k Milestone1`.

## Project structure

| Path | What it is |
|---|---|
| `index.html`, `css/app.css`, `js/` | The browser app: course registry, editor and Pyodide runner, progress, question renderers, lesson blocks, pages |
| `viz/*.js` | Visualizers |
| `topics/NN-name.js`, `questions/NN-name.js` | Lessons and question banks (**the single source of truth**) |
| `questions/builds.js`, `questions/roadmap.js` | Build-from-scratch challenges; the Top 100 roadmap |
| `exercises/`, `solutions/`, `dsa_course/data/` | Generated local exercises, reference solutions and metadata |
| `dsa.py`, `dsa_course/` | Local practice CLI: catalog, sandboxed test runner, progress |
| `projects/` | Ten mini-projects (README, starter, tests, reference) |
| `notebooks/` | Generated Jupyter notebooks, one per topic |
| `curriculum/`, `docs/interview/`, `docs/instructor/` | Roadmap and syllabus; interview guides; instructor guides and rubrics |
| `tests/` | pytest: reference solutions pass, starters fail, runner, CLI, projects, notebooks, and your own work |
| `tools/` | `validate.mjs` + `check.py` (content checks), `export-python.mjs` and `export-docs.mjs` (generators) |
| `docs/audit.md` | The original repository audit and development plan |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Content is written once in `topics/` and `questions/`, checked with `node tools/validate.mjs`, exported with `node tools/export-python.mjs` and `node tools/export-docs.mjs`, and tested with `python -m pytest`. CI runs all of these on every push.
