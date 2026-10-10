"""Reference solution · ll-reverse · Reverse Linked List

Complexity: O(n) time, O(1) space

Approach: Iterative pointer reversal.
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
