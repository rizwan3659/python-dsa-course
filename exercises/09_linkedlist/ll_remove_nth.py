"""ll-remove-nth · Remove Nth Node From End
Topic 9: Linked Lists · medium · Two Pointers

Remove the n-th node from the end (n ≥ 1, always valid) in one pass.

Examples:
    to_list(remove_nth_from_end(build([1, 2, 3, 4, 5]), 2))  ->  [1, 2, 3, 5]
    to_list(remove_nth_from_end(build([1]), 1))  ->  []
    to_list(remove_nth_from_end(build([1, 2]), 1))  ->  [1]

(1 more hidden test run when you check your work.)

Target complexity: O(n) time, O(1) space

Check your work:   python dsa.py test ll-remove-nth
Stuck?             python dsa.py hint ll-remove-nth
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def remove_nth_from_end(head, n):
    pass
