# Project 7: Route Finder

**Concepts:** weighted graphs, Dijkstra, BFS · **Topics:** 17, 18 · **Time:** 2–3 hours

A city map has two-way roads with travel times. Find the fastest route, the route with the fewest roads, and routes that avoid closed roads.

## Requirements

`RouteFinder(roads)` where `roads` is a list of `(a, b, minutes)` two-way roads between named places.

| Method | Behaviour |
|---|---|
| `neighbours(place)` | Sorted list of `(neighbour, minutes)`. Unknown place → `[]`. |
| `fastest(src, dst)` | `(minutes, [src, …, dst])` for the quickest route, or `None`. `fastest(x, x)` is `(0, [x])`. |
| `fewest_roads(src, dst)` | Number of roads on the route with the fewest roads (ignoring time), or −1. |
| `close(a, b)` / `reopen(a, b)` | Close or reopen the road between a and b; closed roads are ignored by every query. |
| `reachable(src, max_minutes)` | Sorted list of places reachable within `max_minutes` (including `src`). |

## Milestones

1. Build the adjacency list and `neighbours` (`TestMilestone1`).
2. Dijkstra with a heap and path reconstruction; BFS for `fewest_roads` (`TestMilestone2`).
3. Closures and `reachable` (`TestMilestone3`).

## Think about it

- Why does Dijkstra need a heap, and why can a place be pushed more than once?
- The fastest route and the route with the fewest roads can differ: which algorithm answers which?
- Store closed roads in a set of frozensets so the direction does not matter.

## Extensions

- A* search with a straight-line distance heuristic when places have coordinates.
- Return the k fastest routes.
