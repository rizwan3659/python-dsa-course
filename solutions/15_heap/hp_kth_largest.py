"""Reference solution · hp-kth-largest · Kth Largest Element (heap)

Complexity: O(n log k)

Approach: Min-heap of size k.
"""


import heapq

def find_kth_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)
    return h[0]
