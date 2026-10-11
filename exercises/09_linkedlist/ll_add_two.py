"""ll-add-two · Add Two Numbers
Topic 9: Linked Lists · medium · Pointer Manipulation

Two numbers are stored as digit lists in reverse order (2 → 4 → 3 is 342).
Return their sum the same way.

Examples:
    to_list(add_two_numbers(build([2, 4, 3]), build([5, 6, 4])))  ->  [7, 0, 8]
    to_list(add_two_numbers(build([0]), build([0])))  ->  [0]
    to_list(add_two_numbers(build([9, 9, 9, 9, 9, 9, 9]), build([9, 9, 9, 9])))  ->  [8, 9, 9, 9, 0, 0, 0, 1]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ nodes in each list ≤ 100
- no leading zeros except 0 itself

Target complexity: O(max(n, m))

Check your work:   python dsa.py test ll-add-two
Stuck?             python dsa.py hint ll-add-two
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def add_two_numbers(a, b):
    pass
