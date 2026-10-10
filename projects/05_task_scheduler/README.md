# Project 5: Task Scheduler with a Priority Queue

**Concepts:** heaps (`heapq`), topological sort, graphs · **Topics:** 15, 18 · **Time:** 2–3 hours

A build server runs tasks one at a time. Urgent tasks go first, but a task can only start once the tasks it depends on are done.

## Requirements

`Scheduler()` with:

| Method | Behaviour |
|---|---|
| `add(name, priority, after=())` | Add a task. Lower `priority` numbers run first. `after` lists tasks that must finish first. |
| `run_order()` | Every task in the order it will run: among the tasks whose dependencies are all done, always pick the lowest priority, then the alphabetically smallest name. Raise `ValueError` if the dependencies contain a cycle or refer to an unknown task. Does not change the scheduler. |
| `pop_next()` | Remove and return the name of the next task that `run_order` would run first, treating removed tasks as done. `None` when empty. |
| `finish_time(durations)` | Given `{task: minutes}`, return `{task: finish time}` when tasks run one at a time in `run_order`. |

## Milestones

1. Priorities only, no dependencies (`TestMilestone1`).
2. Dependencies with Kahn's algorithm + a heap (`TestMilestone2`).
3. Cycle detection and `finish_time` (`TestMilestone3`).

## Think about it

- Without dependencies this is a heap of `(priority, name)`. Why include the name in the tuple?
- With dependencies, keep an in-degree count per task; a task enters the heap when its count reaches 0.
- If the heap empties before every task has run, what does that tell you?

## Extensions

- Run tasks on k parallel workers and compute the total time (a second heap of "worker free at" times).
- Report one cycle as a list of task names.
