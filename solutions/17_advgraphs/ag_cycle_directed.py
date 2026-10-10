"""Reference solution · ag-cycle-directed · Cycle in a Directed Graph

Complexity: O(V + E)

Approach: Three-color DFS.
"""


def has_cycle(n, edges):
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)
    color = [0] * n               # 0 white, 1 gray (on path), 2 black (done)
    def dfs(u):
        color[u] = 1
        for v in graph[u]:
            if color[v] == 1:
                return True
            if color[v] == 0 and dfs(v):
                return True
        color[u] = 2
        return False
    return any(color[u] == 0 and dfs(u) for u in range(n))
