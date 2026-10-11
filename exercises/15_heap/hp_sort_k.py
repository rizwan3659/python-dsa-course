"""hp-sort-k · Sort a Nearly Sorted List
Topic 15: Heap / Priority Queue · medium · Heap / Top-K

Each element is at most k positions away from its sorted position. Sort in
O(n log k).

Examples:
    sort_k_sorted([6, 5, 3, 2, 8, 10, 9], 3)  ->  [2, 3, 5, 6, 8, 9, 10]
    sort_k_sorted([2, 1, 4, 3], 1)  ->  [1, 2, 3, 4]
    sort_k_sorted([], 2)  ->  []

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ len(nums) ≤ 10^5
- 0 ≤ k < len(nums)

Target complexity: O(n log k)

Check your work:   python dsa.py test hp-sort-k
Stuck?             python dsa.py hint hp-sort-k
"""


import heapq

def sort_k_sorted(nums, k):
    pass
