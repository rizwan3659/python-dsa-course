"""Reference solution · ll-length · Length of a Linked List

Complexity: O(n)

Approach: Traversal.

Common mistakes:
- Starting the count at 1 and returning 1 for an empty list.
- Moving head itself is fine in Python, but losing it matters if you need it
  later.

Follow-up challenge: Write it recursively. What happens for 10,000 nodes?
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def length(head):
    n = 0
    while head:
        n += 1
        head = head.next
    return n
