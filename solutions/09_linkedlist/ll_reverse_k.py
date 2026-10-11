"""Reference solution · ll-reverse-k · Reverse Nodes in k-Group

Complexity: O(n) time, O(1) space

Approach: Group-by-group reversal with careful reconnection.

Common mistakes:
- Reversing the last group even when it is shorter than k.
- Not reconnecting the reversed group to the rest.

Follow-up challenge: Also reverse the last group when it is shorter than k.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def reverse_k_group(head, k):
    dummy = ListNode(0, head)
    before = dummy
    while True:
        check = before                     # are there k nodes left?
        for _ in range(k):
            check = check.next
            if check is None:
                return dummy.next
        first = before.next
        prev, cur = None, first
        for _ in range(k):                 # reverse k nodes
            cur.next, prev, cur = prev, cur, cur.next
        before.next = prev                 # prev is the new group head
        first.next = cur                   # old first is now the group tail
        before = first
