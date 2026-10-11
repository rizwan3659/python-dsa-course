"""ll-middle · Middle of the Linked List
Topic 9: Linked Lists · easy · Fast/Slow Pointers

Return the middle node (the second middle for even lengths), in one pass.

Examples:
    to_list(middle_node(build([1, 2, 3, 4, 5])))  ->  [3, 4, 5]
    to_list(middle_node(build([1, 2, 3, 4, 5, 6])))  ->  [4, 5, 6]
    to_list(middle_node(build([1])))  ->  [1]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ number of nodes ≤ 100

Target complexity: O(n) time, O(1) space

Check your work:   python dsa.py test ll-middle
Stuck?             python dsa.py hint ll-middle
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def middle_node(head):
    pass
