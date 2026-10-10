"""Reference solution · ll-rotate · Rotate List

Complexity: O(n)

Approach: Make a ring, then break it at the right place.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def rotate_right(head, k):
    if not head:
        return head
    n, tail = 1, head
    while tail.next:
        tail = tail.next
        n += 1
    k %= n
    if k == 0:
        return head
    tail.next = head                 # close the ring
    new_tail = head
    for _ in range(n - k - 1):
        new_tail = new_tail.next
    new_head = new_tail.next
    new_tail.next = None             # cut it open again
    return new_head
