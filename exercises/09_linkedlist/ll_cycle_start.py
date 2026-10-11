"""ll-cycle-start · Linked List Cycle II (start of the cycle)
Topic 9: Linked Lists · medium · Fast/Slow Pointers

Return the node where the cycle begins, or None. O(1) extra space.

Examples:
    cycle_start(make_cycle([3, 2, 0, -4], 1)).val  ->  2
    cycle_start(make_cycle([1, 2], 0)).val  ->  1
    cycle_start(make_cycle([1], -1))  ->  None

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4

Target complexity: O(n) time, O(1) space

Check your work:   python dsa.py test ll-cycle-start
Stuck?             python dsa.py hint ll-cycle-start
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def cycle_start(head):
    pass
