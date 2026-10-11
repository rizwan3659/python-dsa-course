"""Reference solution · ll-sort · Sort a Linked List

Complexity: O(n log n) time, O(log n) recursion

Approach: Merge sort on the list.

Common mistakes:
- Not cutting the list in half, so recursion never ends.
- Copying into a Python list and calling sorted().

Follow-up challenge: Sort with O(1) extra space using bottom-up merge sort.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def sort_list(head):
    if not head or not head.next:
        return head
    slow, fast = head, head.next              # split in half
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    second = slow.next
    slow.next = None
    a, b = sort_list(head), sort_list(second)
    dummy = tail = ListNode()                 # merge
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next
