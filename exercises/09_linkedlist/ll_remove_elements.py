"""ll-remove-elements · Remove All Occurrences
Topic 9: Linked Lists · easy · Pointer Manipulation

Remove every node whose value equals `x`; return the new head.

Examples:
    to_list(remove_elements(build([1, 2, 6, 3, 4, 5, 6]), 6))  ->  [1, 2, 3, 4, 5]
    to_list(remove_elements(build([7, 7, 7, 7]), 7))  ->  []
    to_list(remove_elements(build([]), 1))  ->  []

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4

Target complexity: O(n)

Check your work:   python dsa.py test ll-remove-elements
Stuck?             python dsa.py hint ll-remove-elements
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def remove_elements(head, x):
    pass
