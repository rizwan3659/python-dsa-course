"""Reference solution · g-adj · Build an Adjacency List

Complexity: O(V + E log E)

Approach: Dict of lists, both directions.
"""


def adjacency(n, edges):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    return {u: sorted(vs) for u, vs in adj.items()}
