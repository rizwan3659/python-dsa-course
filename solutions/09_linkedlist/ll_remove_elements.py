"""Reference solution · ll-remove-elements · Remove All Occurrences

Complexity: O(n)

Approach: Dummy node; only advance when you keep the next node.

Common mistakes:
- Special-casing the head and forgetting runs of matches at the start.
- Advancing prev after a deletion, which skips the next node.

Follow-up challenge: Remove every node whose value appears more than once
(keep none of them).
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def remove_elements(head, x):
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == x:
            cur.next = cur.next.next        # do not advance: check the new next
        else:
            cur = cur.next
    return dummy.next
