"""ll-d1 · Reversal loses the rest
Topic 8: Linked Lists · easy · Pointer Manipulation · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    to_list(reverse_list(build([1, 2, 3])))  ->  [3, 2, 1]

Check your work:   python dsa.py test ll-d1
Stuck?             python dsa.py hint ll-d1
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def reverse_list(head):
    prev, cur = None, head
    while cur:
        cur.next = prev
        prev = cur
        cur = cur.next
    return prev
