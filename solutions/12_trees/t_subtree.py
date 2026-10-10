"""Reference solution · t-subtree · Subtree of Another Tree

Complexity: O(n · m)

Approach: Same-tree check at every node.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_subtree(root, sub):
    def same(a, b):
        if a is None or b is None:
            return a is b
        return a.val == b.val and same(a.left, b.left) and same(a.right, b.right)
    if root is None:
        return sub is None
    return same(root, sub) or is_subtree(root.left, sub) or is_subtree(root.right, sub)
