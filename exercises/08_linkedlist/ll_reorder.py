"""ll-reorder · Reorder List
Topic 8: Linked Lists · medium · Fast/Slow Pointers

Reorder L0 → L1 → … → Ln into L0 → Ln → L1 → Ln−1 → …, in place (return
nothing).

Examples:
    _check([1, 2, 3, 4])  ->  [1, 4, 2, 3]
    _check([1, 2, 3, 4, 5])  ->  [1, 5, 2, 4, 3]
    _check([1])  ->  [1]

(1 more hidden test run when you check your work.)

Target complexity: O(n) time, O(1) space

Check your work:   python dsa.py test ll-reorder
Stuck?             python dsa.py hint ll-reorder
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def reorder_list(head):
    pass
