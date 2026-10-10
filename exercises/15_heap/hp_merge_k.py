"""hp-merge-k · Merge K Sorted Linked Lists
Topic 15: Heap / Priority Queue · hard · Heap / Top-K

Merge k sorted linked lists (`ListNode`, `build`, `to_list` are provided)
into one sorted list.

Examples:
    to_list(merge_k([build([1, 4, 5]), build([1, 3, 4]), build([2, 6])]))  ->  [1, 1, 2, 3, 4, 4, 5, 6]
    to_list(merge_k([]))  ->  []
    to_list(merge_k([build([]), build([1])]))  ->  [1]

Target complexity: O(N log k)

Check your work:   python dsa.py test hp-merge-k
Stuck?             python dsa.py hint hp-merge-k
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


import heapq

def merge_k(lists):
    pass
