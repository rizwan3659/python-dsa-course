"""Reference solution · ll-d2 · The last node is ignored
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def total(head):
    s = 0
    cur = head
    while cur:
        s += cur.val
        cur = cur.next
    return s
