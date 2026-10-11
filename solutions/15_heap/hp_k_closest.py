"""Reference solution · hp-k-closest · K Closest Points to the Origin

Complexity: O(n log k)

Approach: Heap selection by squared distance.

Common mistakes:
- Using sqrt (unnecessary and slower).
- Ignoring the tie-break rule.

Follow-up challenge: Solve it with quickselect in average O(n).
"""


import heapq

def k_closest(points, k):
    best = heapq.nsmallest(k, points, key=lambda p: (p[0] ** 2 + p[1] ** 2, p[0], p[1]))
    return best
