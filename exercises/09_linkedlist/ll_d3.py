"""ll-d3 · Cannot delete the head
Topic 9: Linked Lists · medium · Pointer Manipulation · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    to_list(delete_value(build([5, 6]), 5))  ->  [6]
    to_list(delete_value(build([]), 5))  ->  []
    to_list(delete_value(build([5, 6]), 6))  ->  [5]

Check your work:   python dsa.py test ll-d3
Stuck?             python dsa.py hint ll-d3
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def delete_value(head, x):
    cur = head
    while cur.next:
        if cur.next.val == x:
            cur.next = cur.next.next
            return head
        cur = cur.next
    return head
