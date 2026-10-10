"""Reference solution · g-d3 · One-way friendships
"""


def can_reach(n, edges, a, b):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    seen = set()
    def dfs(u):
        seen.add(u)
        for v in adj[u]:
            if v not in seen:
                dfs(v)
    dfs(a)
    return b in seen
