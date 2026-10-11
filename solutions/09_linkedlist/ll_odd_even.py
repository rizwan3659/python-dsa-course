"""Reference solution · ll-odd-even · Odd Even Linked List

Complexity: O(n) time, O(1) space

Approach: Two interleaved pointers.

Common mistakes:
- Grouping by odd or even values instead of positions.
- Not ending the even list, which creates a cycle.

Follow-up challenge: Split the list into k groups by position modulo k.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def odd_even(head):
    if not head:
        return head
    odd, even = head, head.next
    even_head = even
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = even_head
    return head
