"""Reference solution · hp-kth-largest · Kth Largest Element (heap)

Complexity: O(n log k)

Approach: Min-heap of size k.

Common mistakes:
- Using a max-heap of all n elements (O(n log n)).
- Popping when the heap has k elements instead of more than k.

Follow-up challenge: Keep it working for a stream of numbers.
"""


import heapq

def find_kth_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)
    return h[0]
