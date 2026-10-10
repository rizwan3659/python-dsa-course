"""Reference solution · ll-swap-pairs · Swap Nodes in Pairs

Complexity: O(n)

Approach: Dummy node; rewire three pointers per pair.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def swap_pairs(head):
    dummy = prev = ListNode(0, head)
    while prev.next and prev.next.next:
        a, b = prev.next, prev.next.next
        prev.next, a.next, b.next = b, b.next, a
        prev = a
    return dummy.next
