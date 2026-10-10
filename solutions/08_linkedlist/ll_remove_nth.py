"""Reference solution · ll-remove-nth · Remove Nth Node From End

Complexity: O(n) time, O(1) space

Approach: Gap of n between two pointers, starting from a dummy.
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
