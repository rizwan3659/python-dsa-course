"""ll-kth · Value at Index k
Topic 9: Linked Lists · easy · Pointer Manipulation

Return the value of the node at index k (0-based), or None if the list is
too short.

Examples:
    get_kth(build([5, 6, 7]), 0)  ->  5
    get_kth(build([5, 6, 7]), 2)  ->  7
    get_kth(build([5, 6, 7]), 3)  ->  None

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4
- 0 ≤ k

Target complexity: O(k)

Check your work:   python dsa.py test ll-kth
Stuck?             python dsa.py hint ll-kth
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def get_kth(head, k):
    pass
