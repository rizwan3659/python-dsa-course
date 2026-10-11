"""Reference solution · ll-reverse · Reverse Linked List

Complexity: O(n) time, O(1) space

Approach: Iterative pointer reversal.

Common mistakes:
- Overwriting cur.next before saving it, which loses the rest of the list.
- Returning the old head instead of prev.

Follow-up challenge: Write it recursively, then reverse only positions
left..right (ll-reverse-between).
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
