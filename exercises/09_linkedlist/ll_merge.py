"""ll-merge · Merge Two Sorted Lists
Topic 9: Linked Lists · easy · Pointer Manipulation

Merge two sorted linked lists into one sorted list by relinking the nodes.
Return its head.

Examples:
    to_list(merge_two(build([1, 2, 4]), build([1, 3, 4])))  ->  [1, 1, 2, 3, 4, 4]
    to_list(merge_two(build([]), build([0])))  ->  [0]
    to_list(merge_two(build([]), build([])))  ->  []

Target complexity: O(n + m) time, O(1) space

Check your work:   python dsa.py test ll-merge
Stuck?             python dsa.py hint ll-merge
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def merge_two(a, b):
    pass
