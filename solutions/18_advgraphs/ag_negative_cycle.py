"""Reference solution · ag-negative-cycle · Detect a Negative Cycle

Complexity: O(V · E) time, O(V) space

Approach: Bellman-Ford from a virtual source, plus one extra checking round.

Common mistakes:
- Starting only node 0 at distance 0, which misses cycles that node 0 cannot
  reach.
- Stopping after n − 1 rounds without the extra check.

Follow-up challenge: Return the nodes of one negative cycle (remember each
node’s predecessor and walk back n steps).
"""


def has_negative_cycle(n, edges):
    dist = [0] * n                 # like a virtual source joined to every node with weight 0
    for _ in range(n - 1):
        changed = False
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
        if not changed:            # settled early: no negative cycle
            return False
    return any(dist[u] + w < dist[v] for u, v, w in edges)
