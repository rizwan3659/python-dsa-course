"""Reference solution · ag-bellman · Shortest Paths With Negative Weights

Complexity: O(V · E)

Approach: Bellman-Ford.

Common mistakes:
- Running fewer than n − 1 rounds.
- Relaxing from unreachable nodes (infinity + negative).

Follow-up challenge: Return the actual paths, not just distances.
"""


def bellman_ford(n, edges):
    INF = float("inf")
    dist = [INF] * n
    dist[0] = 0
    for _ in range(n - 1):                 # a shortest path uses at most n - 1 edges
        changed = False
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
        if not changed:
            break
    for u, v, w in edges:                  # still improving → negative cycle
        if dist[u] != INF and dist[u] + w < dist[v]:
            return "negative cycle"
    return [None if d == INF else d for d in dist]
