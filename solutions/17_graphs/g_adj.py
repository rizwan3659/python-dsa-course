"""Reference solution · g-adj · Build an Adjacency List

Complexity: O(V + E log E)

Approach: Dict of lists, both directions.

Common mistakes:
- Adding each edge in only one direction.
- Leaving out nodes with no edges.

Follow-up challenge: Build an adjacency matrix too and compare memory use.
"""


def adjacency(n, edges):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    return {u: sorted(vs) for u, vs in adj.items()}
