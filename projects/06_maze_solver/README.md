# Project 6: Maze Solver

**Concepts:** grids as graphs, BFS, DFS · **Topics:** 17 · **Time:** 2 hours

Load a text maze, find the shortest way out with BFS, compare it with DFS, and draw the path.

```
#########
#S..#...#
#.#.#.#.#
#.#...#E#
#########
```

`S` is the start, `E` the exit, `#` a wall, `.` an open cell. Moves go up, down, left and right.

## Requirements

`Maze(text)` with:

| Method | Behaviour |
|---|---|
| `start`, `exit` | `(row, col)` tuples, found while parsing. Raise `ValueError` if either is missing. |
| `neighbours(cell)` | Open neighbouring cells in the order up, down, left, right. |
| `shortest_path()` | List of cells from S to E (inclusive) with the fewest moves, or `None`. If several are equally short, any is fine. |
| `shortest_distance()` | Number of moves on that path, or −1. |
| `reachable()` | How many open cells (including S and E) can be reached from S. |
| `dfs_path()` | Any path from S to E found by DFS trying neighbours in the order above, or `None`. |
| `render(path)` | The maze text with every path cell except S and E replaced by `*`. |

## Milestones

1. Parsing and `neighbours` (`TestMilestone1`).
2. BFS: `shortest_distance`, `shortest_path`, `reachable` (`TestMilestone2`).
3. DFS and rendering (`TestMilestone3`).

## Think about it

- Why does BFS find the shortest path in an unweighted grid, and DFS not?
- To rebuild the path, remember each cell's parent when you first reach it.
- A recursive DFS on a 300 × 300 open grid can exceed Python's recursion limit. Use an explicit stack.

## Extensions

- Add "mud" cells that cost 3 moves and switch to Dijkstra.
- Generate random mazes with a randomized DFS.
