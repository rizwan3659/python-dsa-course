# Mini-projects

Ten small, realistic programs that each combine several data structures. Every project has:

- `README.md`: the story, requirements, three milestones and extension ideas
- `starter.py`: **your file**, with the class skeleton and TODOs
- `test_*.py`: tests grouped by milestone
- `reference.py`: a model answer (look only after you have passed the tests, or are truly stuck)

| # | Project | Main concepts | Topics |
|---|---|---|---|
| 1 | [Student leaderboard](01_leaderboard/) | dicts, sorting with custom keys | 1, 6, 12 |
| 2 | [Browser history](02_browser_history/) | stacks | 7 |
| 3 | [Customer service ticket queue](03_ticket_queue/) | deque, lazy deletion | 6, 8 |
| 4 | [Contact search](04_contact_search/) | trie | 16 |
| 5 | [Task scheduler](05_task_scheduler/) | heap, topological sort | 15, 18 |
| 6 | [Maze solver](06_maze_solver/) | BFS, DFS on grids | 17 |
| 7 | [Route finder](07_route_finder/) | Dijkstra, BFS | 17, 18 |
| 8 | [Autocomplete engine](08_autocomplete/) | trie + top-k heap | 15, 16 |
| 9 | [LRU cache](09_lru_cache/) | hash map + doubly linked list | 6, 9 |
| 10 | [Recommendation engine](10_recommendations/) | graphs, counting | 6, 17 |

## How to work on a project

```bash
python -m pytest projects/01_leaderboard -k Milestone1     # one milestone at a time
python -m pytest projects/01_leaderboard                   # everything
```

Work milestone by milestone: make `TestMilestone1` pass before reading milestone 2. Then try the extensions.

## For instructors

Projects make good one-week assignments or pair-programming sessions. Suggested grading: 60% tests passing (per milestone), 20% complexity of the chosen data structures (explain it in a short comment at the top of `starter.py`), 20% code clarity. Check the model answers with:

```bash
DSA_PROJECT_IMPL=reference python -m pytest projects
```
