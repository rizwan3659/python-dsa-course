"""Reference solution · ll-d1 · Reversal loses the rest
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def reverse_list(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev
