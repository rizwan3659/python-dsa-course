"""Reference solution · ll-middle · Middle of the Linked List

Complexity: O(n) time, O(1) space

Approach: Fast/slow pointers.

Common mistakes:
- Counting first and walking again: correct but two passes.
- Returning the first middle for even lengths.

Follow-up challenge: Delete the middle node instead of returning it.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
