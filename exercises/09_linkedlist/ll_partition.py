"""ll-partition · Partition List
Topic 9: Linked Lists · medium · Pointer Manipulation

Put all nodes with value < x before the nodes ≥ x, keeping the relative
order inside each group.

Examples:
    to_list(partition(build([1, 4, 3, 2, 5, 2]), 3))  ->  [1, 2, 2, 4, 3, 5]
    to_list(partition(build([2, 1]), 2))  ->  [1, 2]
    to_list(partition(build([]), 0))  ->  []

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 200

Target complexity: O(n)

Check your work:   python dsa.py test ll-partition
Stuck?             python dsa.py hint ll-partition
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def partition(head, x):
    pass
