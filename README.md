# Python DSA Lab

A hands-on data structures and algorithms course in Python, for students who know basic Python and are new to DSA. It is built around **doing**, not reading: short explanations, then you predict, visualize, dry-run, code, debug, solve, optimize and revise.

**Open the course:** https://rizwan3659.github.io/python-dsa-course/

No install, no account, no build step. Coding exercises run real Python in the browser with [Pyodide](https://pyodide.org) (the first run downloads about 10 MB, then it is cached). Progress is saved in the browser (localStorage) and can be exported from the Progress page.

## What is inside

| | |
|---|---|
| **18 topics** | Python for DSA → Big-O → Arrays → Strings → Hash Tables → Stack → Queue & Deque → Linked Lists → Recursion & Backtracking → Searching → Sorting → Trees → BST → Heap → Trie → Graphs → Advanced Graphs → Problem-Solving Patterns |
| **800+ practice questions** | predict the output, concept, complexity, choose the data structure, dry-run tables, complete the code, debug, and coding problems with automatic tests |
| **35+ visualizers** | step through algorithms with Prev / Next / Play / Pause / Reset / Speed (keyboard: ← → Space) |
| **12 build-from-scratch challenges** | Stack, Queue, Circular Queue, Linked List, Doubly Linked List, HashMap, BST, Heap, Trie, Graph, Union-Find, LRU Cache |
| **Brute force → optimal walkthroughs** | see the slow solution, find the repeated work, choose a better tool, analyze again |

## Pages

- **Learn**: the curriculum map. Each topic has *Learn* (short lessons that alternate explanation with exercises), *Visualize*, *Practice*, *Challenge* and *Review* tabs, plus a 60-minute session timer (learn → visualize → easy → medium → debug → quiz).
- **Practice**: the Practice Arena, filterable by topic, difficulty (🟢 🟡 🔴), pattern, type and status (solved / unsolved / needs revision). Also **Today's Practice**: 8 problems a day (2 easy, 4 medium, 1 debugging, 1 revision).
- **Visualize**: every visualizer in one gallery.
- **Challenges**: build-from-scratch data structures, brute force → optimal walkthroughs, hard problems.
- **Interview**: a random problem with a 20/35/45-minute timer and no hints, then a debrief (tests passed, your complexity vs the reference, approach, reference solution).
- **Revision**: wrong answers come back after 1, 2, 4 and 8 days (spaced repetition); answer correctly four times and they leave the queue.
- **Progress**: overall progress, topic mastery (a rough guide, not a precise measurement), streak, achievements, activity, export/import.

Every question has a hint ladder: Hint 1 → Hint 2 → Approach → Show solution.

## Run it locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Practise in your own editor (local Python track)

All **340 runnable exercises** from the course (coding, build-from-scratch, optimize and debugging) are also plain Python files you can solve in VS Code, PyCharm or any editor. You only need Python 3.10+. No packages are required.

```bash
git clone https://github.com/rizwan3659/python-dsa-course.git
cd python-dsa-course
python dsa.py list arrays            # exercises in a topic, with your status
```

Open the exercise file, e.g. `exercises/03_arrays/arr_find_max.py`, replace the `pass` with your code, then:

```bash
python dsa.py test arr-find-max      # run the tests: visible ones in full, hidden ones on request (--reveal)
python dsa.py hint arr-find-max      # one more hint each time (hint 1 → hint 2 → approach)
python dsa.py progress               # progress per topic and difficulty, weak topics, what to do next
python dsa.py solution arr-find-max  # the reference solution, after you have really tried
```

Your code runs in a separate Python process with a time limit, so an infinite loop just reports a timeout. Progress is saved in `.dsa_progress.json` (not committed). With pytest installed (`pip install -r requirements.txt`), `pytest tests/test_my_solutions.py` checks every exercise you have edited at once.

## Project structure

| Path | What it is |
|---|---|
| `index.html`, `css/app.css` | Page shell and styles (light and dark mode) |
| `js/core.js` | Course registry, helpers, Python syntax highlighting, code editor, Pyodide runner (in a Web Worker so infinite loops can be stopped) |
| `js/progress.js` | Progress tracking, revision queue, mastery, daily plan, achievements |
| `js/questions.js` | Question renderers for every type, hint system, sequential runner |
| `js/blocks.js` | Lesson blocks: text, code, diagrams, inline questions, visualizers, quizzes, brute-force → optimal |
| `js/player.js` | Step player and drawing helpers (arrays, trees, graphs, linked lists) |
| `js/pages.js` | Pages and the hash router |
| `viz/*.js` | Visualizers |
| `topics/NN-name.js` | Lessons for each topic |
| `questions/NN-name.js`, `questions/builds.js` | Question banks |
| `tools/validate.mjs`, `tools/check.py` | Content validator |
| `tools/export-python.mjs` | Generates the local Python track from the question banks |
| `exercises/NN_topic/`, `solutions/NN_topic/` | Local exercise files (generated starters) and reference solutions |
| `dsa.py`, `dsa_course/` | Local practice CLI: catalog, sandboxed test runner, progress tracking |
| `tests/` | pytest: reference solutions pass, starters fail, runner and CLI tests, and your own work |
| `curriculum/roadmap.md`, `docs/audit.md` | Learning roadmap; repository audit and development plan |

### Adding content

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: content is written once in `topics/` and `questions/`, checked with `node tools/validate.mjs`, exported with `node tools/export-python.mjs`, and tested with `python -m pytest`.
