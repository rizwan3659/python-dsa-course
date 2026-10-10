"""Reference solution · ll-dedupe-sorted · Remove Duplicates from Sorted List

Complexity: O(n)

Approach: Skip next nodes equal to the current one.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def delete_duplicates(head):
    cur = head
    while cur and cur.next:
        if cur.next.val == cur.val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return head
