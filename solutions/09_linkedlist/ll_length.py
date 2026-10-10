"""Reference solution · ll-length · Length of a Linked List

Complexity: O(n)

Approach: Traversal.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def length(head):
    n = 0
    while head:
        n += 1
        head = head.next
    return n
