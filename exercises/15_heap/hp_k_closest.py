"""hp-k-closest · K Closest Points to the Origin
Topic 15: Heap / Priority Queue · medium · Heap / Top-K

Return the k points closest to (0, 0), sorted by distance (ties: by x, then
y).

Examples:
    k_closest([[1, 3], [-2, 2]], 1)  ->  [[-2, 2]]
    k_closest([[3, 3], [5, -1], [-2, 4]], 2)  ->  [[3, 3], [-2, 4]]
    k_closest([[0, 1], [1, 0]], 2)  ->  [[0, 1], [1, 0]]

Target complexity: O(n log k)

Check your work:   python dsa.py test hp-k-closest
Stuck?             python dsa.py hint hp-k-closest
"""


import heapq

def k_closest(points, k):
    pass
