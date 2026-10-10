"""Reference solution · hp-sort-k · Sort a Nearly Sorted List

Complexity: O(n log k)

Approach: Sliding heap of size k + 1.
"""


import heapq

def sort_k_sorted(nums, k):
    h = nums[:k + 1]
    heapq.heapify(h)
    out = []
    for x in nums[k + 1:]:
        out.append(heapq.heappushpop(h, x))
    while h:
        out.append(heapq.heappop(h))
    return out
