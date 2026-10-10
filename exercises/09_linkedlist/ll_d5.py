"""ll-d5 · Merge drops the tail
Topic 9: Linked Lists · easy · Pointer Manipulation · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    to_list(merge(build([1, 4]), build([2, 3, 9])))  ->  [1, 2, 3, 4, 9]

Check your work:   python dsa.py test ll-d5
Stuck?             python dsa.py hint ll-d5
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def merge(a, b):
    dummy = tail = ListNode()
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    return dummy.next
