"""Reference solution · ll-remove-nth · Remove Nth Node From End

Complexity: O(n) time, O(1) space

Approach: Gap of n between two pointers, starting from a dummy.

Common mistakes:
- Failing when the head itself is removed (use a dummy node).
- Starting the gap between the pointers at n − 1 or n + 1.

Follow-up challenge: Remove the n-th node from the end of a doubly linked
list.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n):           # fast leads by n nodes
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next   # slow is just before the target
    return dummy.next
