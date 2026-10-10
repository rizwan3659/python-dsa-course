"""ll-odd-even · Odd Even Linked List
Topic 8: Linked Lists · medium · Pointer Manipulation

Group nodes at odd positions (1st, 3rd, …) followed by those at even
positions, keeping relative order. O(1) extra space.

Examples:
    to_list(odd_even(build([1, 2, 3, 4, 5])))  ->  [1, 3, 5, 2, 4]
    to_list(odd_even(build([2, 1, 3, 5, 6, 4, 7])))  ->  [2, 3, 6, 7, 1, 5, 4]
    to_list(odd_even(build([])))  ->  []

Target complexity: O(n) time, O(1) space

Check your work:   python dsa.py test ll-odd-even
Stuck?             python dsa.py hint ll-odd-even
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def odd_even(head):
    pass
