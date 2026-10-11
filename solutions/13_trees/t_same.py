"""Reference solution · t-same · Same Tree

Complexity: O(n)

Approach: Compare roots, then both pairs of subtrees.

Common mistakes:
- Comparing only values, not shape.
- Not handling the case where exactly one node is None.

Follow-up challenge: Check whether two trees are mirror images.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_same(p, q):
    if p is None or q is None:
        return p is q
    return p.val == q.val and is_same(p.left, q.left) and is_same(p.right, q.right)
