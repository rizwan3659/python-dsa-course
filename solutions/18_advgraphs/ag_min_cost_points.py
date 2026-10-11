"""Reference solution · ag-min-cost-points · Min Cost to Connect All Points

Complexity: O(n² log n)

Approach: Prim's MST on the complete graph.

Common mistakes:
- Building all n² edges and sorting them (works, but O(n² log n)).
- Using Euclidean instead of Manhattan distance.

Follow-up challenge: Use Prim's algorithm with an O(n²) array instead of a
heap.
"""


import heapq

def min_cost_connect(points):
    n = len(points)
    seen, total = set(), 0
    pq = [(0, 0)]                          # (cost to join the tree, point index)
    while len(seen) < n:
        cost, i = heapq.heappop(pq)
        if i in seen:
            continue
        seen.add(i)
        total += cost
        xi, yi = points[i]
        for j in range(n):
            if j not in seen:
                d = abs(xi - points[j][0]) + abs(yi - points[j][1])
                heapq.heappush(pq, (d, j))
    return total
