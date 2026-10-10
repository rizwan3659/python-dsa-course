"""Reference solution · build-graph · Build a Graph (adjacency list)

Complexity: O(V + E) for traversals

Approach: Dict of neighbor sets; BFS with a queue, DFS with recursion.
"""


from collections import deque


class Graph:
    def __init__(self):
        self.adj = {}

    def add_edge(self, u, v):
        self.adj.setdefault(u, set()).add(v)
        self.adj.setdefault(v, set()).add(u)

    def neighbors(self, u):
        return sorted(self.adj.get(u, ()))

    def has_edge(self, u, v):
        return v in self.adj.get(u, ())

    def bfs(self, start):
        order, seen = [], {start}
        queue = deque([start])
        while queue:
            u = queue.popleft()
            order.append(u)
            for v in self.neighbors(u):
                if v not in seen:
                    seen.add(v)          # mark when queued, not when visited
                    queue.append(v)
        return order

    def dfs(self, start):
        order, seen = [], set()
        def go(u):
            seen.add(u)
            order.append(u)
            for v in self.neighbors(u):
                if v not in seen:
                    go(v)
        go(start)
        return order

    def has_path(self, u, v):
        if u not in self.adj or v not in self.adj:
            return u == v
        return v in self.bfs(u)
