"""Reference solution · ll-dedupe-sorted · Remove Duplicates from Sorted List

Complexity: O(n)

Approach: Skip next nodes equal to the current one.

Common mistakes:
- Advancing cur after removing a duplicate, which misses a third copy.
- Using a set: correct, but ignores that the list is sorted.

Follow-up challenge: The list is not sorted: remove duplicates with a set in
one pass.
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
