"""ll-intersection · Intersection of Two Linked Lists
Topic 9: Linked Lists · easy · Two Pointers

Two lists may merge into a shared tail. Return the first shared node
(compare nodes with `is`, not values), or None.

Examples:
    4 → 1 ↘ and 5 → 6 → 1 ↘ meet at 8 → 4 → 5
    different lengths
    no intersection → None

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ nodes in each list ≤ 3 × 10^4

Target complexity: O(n + m) time, O(1) space

Check your work:   python dsa.py test ll-intersection
Stuck?             python dsa.py hint ll-intersection
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def get_intersection(a, b):
    pass
