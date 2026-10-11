# Stage 1 audit and gap analysis

*Audit date: 2026-10-10. Numbers come from `node tools/validate.mjs` and `dsa_course/data/exercises.json`.*

## 1. What already exists

The repository holds a **static, no-build browser course** (HTML/CSS/vanilla JS, hosted on GitHub Pages). Student code runs in the student's own browser with **Pyodide inside a Web Worker**, which can be terminated, so an infinite loop never freezes the page and no server ever executes student code.

> Note: the last commit (`4f22fee`, "sessions 1-3") contains only the first prototype (`engine.js`, `sessions/`). The current platform (`js/`, `topics/`, `questions/`, `viz/`, `tools/`, about 12,000 lines) is **not committed yet**. Commit it as a baseline before building on it.

| Area | Status |
|---|---|
| Topics | 18 topics in 6 parts, 109 short lessons that alternate explanation with exercises |
| Question bank | **864 questions**: predict the output 159, coding 278 (incl. 12 build-from-scratch, 5 optimize), concept MCQ 82, complexity 105, choose the data structure 80, dry-run tables 44, complete the code 51, debug 65 |
| Validation | `tools/validate.mjs` + `tools/check.py` run **every** solution, test, predicted output, dry-run table, blank and lesson snippet in real Python. All pass. |
| Visualizers | 37 step-through visualizers (arrays, two pointers, windows, sorting, binary search, stack/queue, linked lists, recursion tree, trees, BFS/DFS, Dijkstra, union-find, ...) |
| Learning features | hint ladder (hint 1 → hint 2 → approach → solution), practice arena with filters, daily practice, interview mode with timer, spaced-repetition revision, progress/mastery/streaks, export/import |
| Local Python | **none before this milestone**: no `pyproject.toml`, pytest suite or exercise files you can open in an editor |
| Docs | README only. No CONTRIBUTING, curriculum documents, instructor notes, projects or interview roadmap |

### Teaching sequence coverage

The lessons already follow most of the requested sequence: motivation and intuition (`lead`, diagrams), visualization (`viz` blocks), implementation (`code` blocks), dry runs (`dryrun`), complexity (`complexity`), guided exercises (`blanks`), independent exercises (`code`), debugging (`debug`), interview problems (Patterns topic, Interview page), revision quiz (Review tab) and challenges (Challenge tab). The weakest links are **prerequisites**, **constraints** and **common mistakes**, which are not part of the exercise schema.

## 2. Mapping to the requested 11-phase curriculum

| Phase | Covered by | Coverage | Main gaps |
|---|---|---|---|
| 1 Python foundations | `python` | Good | exception handling (1 mention), `copy`/`deepcopy`, input/output, recursion intro lives in topic 9 |
| 2 Algorithmic thinking | `python` lesson 1, `bigo` | Partial | decomposition, pseudocode/flowcharts, brute force as a deliberate first step, Omega/Theta, best/average/worst case, basic math reasoning |
| 3 Arrays and strings | `arrays`, `strings` | Strong | **difference arrays** (none) |
| 4 Searching and sorting | `searching`, `sorting` | Strong | stability comparison table could be more explicit |
| 5 Recursion and backtracking | `recursion` | Partial | **Sudoku solver** (none), **combination sum** (1 mention), N-Queens only in the patterns topic, a single backtracking lesson |
| 6 Linked lists, stacks, queues | `linkedlist`, `stack`, `queue` | Strong | none significant |
| 7 Hashing and heaps | `hashing`, `heap` | Strong | none significant |
| 8 Trees and BSTs | `trees`, `bst` | Strong | tree construction from traversals (check), balanced trees only an overview (as requested) |
| 9 Graphs | `graphs`, `advgraphs` | Good | Bellman-Ford only mentioned (2 files); Dijkstra has a lesson, Bellman-Ford does not |
| 10 Greedy and DP | spread over `recursion` (memoization), `patterns` (greedy, intervals) | **Weak** | **no DP topic**: knapsack, coin change, LCS, LIS, grid DP, tabulation, space optimisation are all missing. No greedy topic. |
| 11 Advanced | `trie`, `advgraphs`, `patterns` | Partial | **bit manipulation, segment trees, Fenwick trees** (none), advanced DP |

## 3. Exercise inventory (locally runnable track)

340 exercises run with `python dsa.py test <id>` and pytest: 261 code, 5 optimize, 12 build, 62 debug. The other 524 bank items (predict, MCQ, complexity, dry-run, blanks) are browser-only.

| # | Topic | Local exercises | easy | medium | hard | debug | build/optimize |
|---|---|---|---|---|---|---|---|
| 1 | Python for DSA | 14 | 11 | 3 | 0 | 4 | 0 |
| 2 | Big-O Complexity | 5 | 3 | 2 | 0 | 0 | 2 |
| 3 | Arrays / Python Lists | 41 | 23 | 15 | 3 | 8 | 2 |
| 4 | Strings | 19 | 10 | 8 | 1 | 3 | 0 |
| 5 | Hash Tables | 26 | 14 | 12 | 0 | 5 | 1 |
| 6 | Stack | 18 | 7 | 10 | 1 | 4 | 1 |
| 7 | Queue & Deque | 14 | 7 | 6 | 1 | 3 | 2 |
| 8 | Linked Lists | 29 | 12 | 14 | 3 | 5 | 3 |
| 9 | Recursion & Backtracking | 22 | 12 | 9 | 1 | 4 | 1 |
| 10 | Searching | 18 | 8 | 8 | 2 | 3 | 0 |
| 11 | Sorting | 17 | 10 | 6 | 1 | 3 | 0 |
| 12 | Trees | 27 | 15 | 9 | 3 | 4 | 0 |
| 13 | Binary Search Trees | 16 | 7 | 9 | 0 | 3 | 1 |
| 14 | Heap / Priority Queue | 15 | 3 | 10 | 2 | 3 | 1 |
| 15 | Trie | 10 | 3 | 6 | 1 | 2 | 1 |
| 16 | Graphs | 21 | 8 | 11 | 2 | 3 | 1 |
| 17 | Advanced Graphs | 16 | 0 | 13 | 3 | 3 | 1 |
| 18 | Problem-Solving Patterns | 12 | 2 | 10 | 0 | 2 | 0 |
| | **Total** | **340** | **155** | **161** | **24** | **62** | **17** |

Against the per-topic targets in the brief (5–10 easy, 5–10 medium, 2–5 hard, 2 debugging, 2 tracing):

- **Hard problems are thin**: 24 in total, none in Python, Big-O, Hash Tables, BST or Patterns.
- **Big-O has only 5 runnable exercises** (it relies on 25 complexity questions instead, which is reasonable for that topic).
- Debugging (≥2 per topic) and code tracing (44 dry-run tables) meet the target nearly everywhere.
- **Exercise metadata gaps**: coding problems have prompt, starter, tests, 2 hints + approach, reference solution and complexity. They lack *prerequisites*, *constraints*, a guaranteed *three examples*, *common mistakes*, *follow-up challenges* and a written dry run. 142 of 278 coding problems have fewer than four tests (28 have only one or two), so they have no hidden tests.

## 4. Architecture decisions

1. **Keep the browser app as the interactive interface; do not add Streamlit.** The brief asks that student code never runs in the main application process. A Streamlit app would run student code on the server, which is exactly that risk. The existing Pyodide-in-a-Worker design already meets the requirement with no server at all, and it is hosted for free on GitHub Pages.
2. **One source of truth.** Questions live once, in `questions/*.js`. The local Python track (`exercises/`, `solutions/`, `dsa_course/data/exercises.json`) is **generated** from them by `tools/export-python.mjs`, so the browser and the local track can never disagree. `--check` mode detects stale generated files.
3. **Organise exercises by topic, not by difficulty.** The brief suggests `exercises/easy|medium|hard`. Topic folders (`exercises/04_arrays/`) match the course order; difficulty is in each file's header and in `python dsa.py list --difficulty`.
4. **Stable IDs.** The question id (`arr-find-max`) is the exercise id everywhere: browser progress, `exercises/04_arrays/arr_find_max.py`, `solutions/04_arrays/arr_find_max.py`, pytest ids (`arrays:arr-find-max`) and `.dsa_progress.json`.
5. **Local execution safety.** `python dsa.py test` runs your file in a separate `python -I` process with a time limit (and an address-space limit on Linux), so an infinite loop or crash cannot hang the checker. It is a safety net for your own code, not a sandbox for untrusted code.
6. **Lessons stay in `topics/*.js`.** The brief's `lessons/NN_*/` folders would duplicate them. Markdown/Jupyter exports of lessons can be generated later the same way as the exercises if wanted.

## 5. Implementation plan

*Status updated 2026-10-11. Current totals: 23 topics, 140 lessons, 1,097 questions (361 coding), 44 visualizers, 443 local exercises, 10 projects.*

| Milestone | Scope | Status |
|---|---|---|
| **M1** | Audit (this file), curriculum roadmap, CONTRIBUTING, local practice track: exporter, `python dsa.py` CLI (list/show/test/hint/solution/progress/next), sandboxed runner, local progress with weak-topic detection, pytest suites | **Done** |
| M2 | Exercise schema v2: `constraints`, `prereq`, `mistakes`, `followup`, `dry`, 3 hint levels; the first 3 tests are shown as examples. Rendered in the browser and exported; the validator requires it in topics 3, 19–22 | **Partly done:** required and used in all new topics, gap fills and hard problems (about 100 problems). Not yet backfilled into the original 278 problems; 142 of them still have fewer than 4 tests (so no hidden tests) |
| M3 | Topics Algorithmic Thinking, Greedy, Dynamic Programming, with brute-pairs, activity-selection and DP-table visualizers | **Done** |
| M4 | Bit Manipulation and Range Queries topics (difference arrays, Fenwick, segment trees); Bellman-Ford lesson; pruning lesson with Sudoku, Combination Sum II, Word Search; exceptions, copying and input in topic 1; 8 new hard problems and a mixed-pattern lesson | **Done**, except that strings, stack, queue, sorting and trie still have only 1 hard problem, and topics 1–2 have none (by design) |
| M5 | `projects/`: 10 mini-projects (README with requirements, milestones and extensions; starter; tests per milestone; reference) | **Done** |
| M6 | Top 100 roadmap (3 tracks, 8-week plan) on the Interview page and in docs; pattern, communication, Python-mistakes and mock-interview guides | **Done** |
| M7 | Instructor guide per topic (generated: objectives, duration, prerequisites, lesson plan, demos, questions, classroom, pair and homework exercises, solutions) and a teaching handbook with rubrics | **Done** (per topic, not per individual lesson) |
| M8 | CI (validate, generator freshness, pytest on Python 3.10 and 3.12); Jupyter notebooks per topic | **Done**; an accessibility and learner-experience review has not been done yet |

See [curriculum/roadmap.md](../curriculum/roadmap.md) for the learner-facing roadmap.
