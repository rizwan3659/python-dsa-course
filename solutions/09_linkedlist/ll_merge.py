"""Reference solution · ll-merge · Merge Two Sorted Lists

Complexity: O(n + m) time, O(1) space

Approach: Dummy head + tail pointer.

Common mistakes:
- Forgetting to attach the leftover nodes of the longer list.
- Creating new nodes instead of relinking existing ones.

Follow-up challenge: Merge k sorted lists (hp-merge-k).
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def merge_two(a, b):
    dummy = tail = ListNode()
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next
