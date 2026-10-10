"""Reference solution · ll-d5 · Merge drops the tail
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
    tail.next = a or b
    return dummy.next
