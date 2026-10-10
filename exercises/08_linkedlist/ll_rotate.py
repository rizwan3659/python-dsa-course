"""ll-rotate · Rotate List
Topic 8: Linked Lists · medium · Pointer Manipulation

Rotate the list to the right by k places.

`[1, 2, 3, 4, 5], k = 2` → `[4, 5, 1, 2, 3]`

Examples:
    to_list(rotate_right(build([1, 2, 3, 4, 5]), 2))  ->  [4, 5, 1, 2, 3]
    to_list(rotate_right(build([0, 1, 2]), 4))  ->  [2, 0, 1]
    to_list(rotate_right(build([]), 1))  ->  []

(1 more hidden test run when you check your work.)

Target complexity: O(n)

Check your work:   python dsa.py test ll-rotate
Stuck?             python dsa.py hint ll-rotate
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def rotate_right(head, k):
    pass
