"""Reference solution · ll-d3 · Cannot delete the head
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def delete_value(head, x):
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == x:
            cur.next = cur.next.next
            break
        cur = cur.next
    return dummy.next
