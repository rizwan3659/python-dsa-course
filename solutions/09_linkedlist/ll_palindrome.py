"""Reference solution · ll-palindrome · Palindrome Linked List

Complexity: O(n) time, O(1) space

Approach: Middle (fast/slow) + reverse second half + compare.

Common mistakes:
- Reversing the whole list and comparing it with itself (they are the same
  nodes).
- Not restoring the list after reversing its second half.

Follow-up challenge: Restore the list to its original order before
returning.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def is_palindrome(head):
    slow = fast = head
    while fast and fast.next:            # find the middle
        slow = slow.next
        fast = fast.next.next
    prev = None
    while slow:                          # reverse the second half
        slow.next, prev, slow = prev, slow, slow.next
    left, right = head, prev
    while right:                         # compare the halves
        if left.val != right.val:
            return False
        left, right = left.next, right.next
    return True
