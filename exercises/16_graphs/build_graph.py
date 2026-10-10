"""build-graph · Build a Graph (adjacency list)
Topic 16: Graphs · medium · Design / Build · build

Implement an undirected graph stored as an adjacency list (dict of sets).

Requirements:
- `add_edge(u, v)` (adds both nodes if new)
- `neighbors(u)` → sorted list
- `has_edge(u, v)`
- `bfs(start)` and `dfs(start)` → visit order, exploring neighbors in sorted
  order (dfs is recursive preorder)
- `has_path(u, v)`

Examples:
    neighbors and edges (undirected)
    bfs from 1
    dfs from 1

(1 more hidden test run when you check your work.)

Target complexity: O(V + E) for traversals

Check your work:   python dsa.py test build-graph
Stuck?             python dsa.py hint build-graph
"""


from collections import deque


class Graph:
    def __init__(self):
        self.adj = {}

    def add_edge(self, u, v):
        pass

    def neighbors(self, u):
        pass

    def has_edge(self, u, v):
        pass

    def bfs(self, start):
        pass

    def dfs(self, start):
        pass

    def has_path(self, u, v):
        pass
