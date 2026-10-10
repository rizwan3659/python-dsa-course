"""Reference solution · ll-d4 · Cycle check crashes
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
