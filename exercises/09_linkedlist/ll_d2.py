"""ll-d2 · The last node is ignored
Topic 9: Linked Lists · easy · Pointer Manipulation · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    total(build([1, 2, 3]))  ->  6
    total(build([]))  ->  0

Check your work:   python dsa.py test ll-d2
Stuck?             python dsa.py hint ll-d2
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def total(head):
    s = 0
    cur = head
    while cur.next:
        s += cur.val
        cur = cur.next
    return s
