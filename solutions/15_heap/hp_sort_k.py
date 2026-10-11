"""Reference solution · hp-sort-k · Sort a Nearly Sorted List

Complexity: O(n log k)

Approach: Sliding heap of size k + 1.

Common mistakes:
- Sorting the whole list (O(n log n)).
- A heap of size k instead of k + 1.

Follow-up challenge: What if k is unknown?
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
