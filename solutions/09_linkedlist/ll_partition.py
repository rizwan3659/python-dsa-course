"""Reference solution · ll-partition · Partition List

Complexity: O(n)

Approach: Two dummy-headed chains, then concatenate.

Common mistakes:
- Not ending the second list, which leaves a cycle.
- Changing the relative order inside a group.

Follow-up challenge: Partition into three groups:  x.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def partition(head, x):
    small = s_tail = ListNode()
    big = b_tail = ListNode()
    while head:
        if head.val < x:
            s_tail.next = head
            s_tail = head
        else:
            b_tail.next = head
            b_tail = head
        head = head.next
    b_tail.next = None
    s_tail.next = big.next
    return small.next
