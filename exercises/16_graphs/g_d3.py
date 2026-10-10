"""g-d3 · One-way friendships
Topic 16: Graphs · easy · DFS · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    can_reach(2, [(0, 1)], 1, 0)  ->  True

Check your work:   python dsa.py test g-d3
Stuck?             python dsa.py hint g-d3
"""


def can_reach(n, edges, a, b):      # undirected graph
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
    seen = set()
    def dfs(u):
        seen.add(u)
        for v in adj[u]:
            if v not in seen:
                dfs(v)
    dfs(a)
    return b in seen
