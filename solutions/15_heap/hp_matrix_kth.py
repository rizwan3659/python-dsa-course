"""Reference solution · hp-matrix-kth · Kth Smallest in a Sorted Matrix

Complexity: O(k log n)

Approach: k-way merge with a heap.

Common mistakes:
- Flattening and sorting (O(n² log n)).
- Pushing every element into the heap at once.

Follow-up challenge: Solve it with binary search on the value range.
"""


import heapq

def kth_smallest(matrix, k):
    n = len(matrix)
    h = [(matrix[r][0], r, 0) for r in range(n)]   # front of each row
    heapq.heapify(h)
    for _ in range(k - 1):
        val, r, c = heapq.heappop(h)
        if c + 1 < len(matrix[r]):
            heapq.heappush(h, (matrix[r][c + 1], r, c + 1))
    return h[0][0]
