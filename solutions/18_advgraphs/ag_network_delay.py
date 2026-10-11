"""Reference solution · ag-network-delay · Network Delay Time

Complexity: O((V + E) log V)

Approach: Dijkstra, then max.

Common mistakes:
- Using BFS (weights matter).
- Returning the sum of times instead of the maximum shortest distance.

Follow-up challenge: Return which node receives the signal last.
"""


import heapq

def network_delay(times, n, k):
    graph = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        graph[u].append((v, w))
    dist = {k: 0}
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(pq, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1
