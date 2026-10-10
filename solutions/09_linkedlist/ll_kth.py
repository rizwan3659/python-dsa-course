"""Reference solution · ll-kth · Value at Index k

Complexity: O(k)

Approach: Walk k steps.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def get_kth(head, k):
    cur = head
    for _ in range(k):
        if cur is None:
            return None
        cur = cur.next
    return cur.val if cur else None
