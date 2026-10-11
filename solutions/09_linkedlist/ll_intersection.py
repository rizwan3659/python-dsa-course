"""Reference solution · ll-intersection · Intersection of Two Linked Lists

Complexity: O(n + m) time, O(1) space

Approach: Two pointers that switch lists equalise the path lengths.

Common mistakes:
- Comparing values instead of node identity.
- Assuming the lists have the same length.

Follow-up challenge: Find it in O(1) extra space by switching heads when a
pointer reaches the end.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def get_intersection(a, b):
    p, q = a, b
    while p is not q:
        p = p.next if p else b      # after finishing a, walk b
        q = q.next if q else a      # after finishing b, walk a
    return p
