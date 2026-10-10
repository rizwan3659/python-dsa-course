"""Reference solution · ll-cycle-start · Linked List Cycle II (start of the cycle)

Complexity: O(n) time, O(1) space

Approach: Floyd's algorithm, phase two: distance from head to the start
equals distance from the meeting point to the start (mod cycle length).
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            p = head                     # restart one pointer from head
            while p is not slow:
                p = p.next
                slow = slow.next
            return p
    return None
