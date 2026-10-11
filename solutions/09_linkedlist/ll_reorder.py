"""Reference solution · ll-reorder · Reorder List

Complexity: O(n) time, O(1) space

Approach: Fast/slow + reverse + weave.

Common mistakes:
- Not cutting the list in the middle, which creates a cycle.
- Copying values into a Python list (not the intended O(1) space).

Follow-up challenge: Do it with O(1) extra space and no recursion.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def reorder_list(head):
    if not head:
        return
    slow = fast = head
    while fast.next and fast.next.next:      # middle (first of two)
        slow = slow.next
        fast = fast.next.next
    prev, cur = None, slow.next               # reverse the second half
    slow.next = None
    while cur:
        cur.next, prev, cur = prev, cur, cur.next
    a, b = head, prev                         # weave
    while b:
        a_next, b_next = a.next, b.next
        a.next, b.next = b, a_next
        a, b = a_next, b_next
