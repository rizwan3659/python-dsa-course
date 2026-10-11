"""Reference solution · ll-reverse-between · Reverse Between Positions

Complexity: O(n)

Approach: Front-insertion inside the section.

Common mistakes:
- Failing when left is 1 (use a dummy node).
- Losing the node after position right.

Follow-up challenge: Do it in one pass.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def reverse_between(head, left, right):
    dummy = ListNode(0, head)
    before = dummy
    for _ in range(left - 1):
        before = before.next
    cur = before.next
    for _ in range(right - left):    # move cur.next to the front of the section
        moved = cur.next
        cur.next = moved.next
        moved.next = before.next
        before.next = moved
    return dummy.next
