"""ll-reverse-between · Reverse Between Positions
Topic 9: Linked Lists · medium · Pointer Manipulation

Reverse the nodes from position `left` to `right` (1-indexed, inclusive).

`[1, 2, 3, 4, 5], 2, 4` → `[1, 4, 3, 2, 5]`

Examples:
    to_list(reverse_between(build([1, 2, 3, 4, 5]), 2, 4))  ->  [1, 4, 3, 2, 5]
    to_list(reverse_between(build([5]), 1, 1))  ->  [5]
    to_list(reverse_between(build([3, 5]), 1, 2))  ->  [5, 3]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ left ≤ right ≤ number of nodes ≤ 500

Target complexity: O(n)

Check your work:   python dsa.py test ll-reverse-between
Stuck?             python dsa.py hint ll-reverse-between
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def reverse_between(head, left, right):
    pass
