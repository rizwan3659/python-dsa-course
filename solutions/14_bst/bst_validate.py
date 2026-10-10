"""Reference solution · bst-validate · Validate a BST

Complexity: O(n)

Approach: Range checking DFS.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_valid_bst(root):
    def ok(node, lo, hi):
        if node is None:
            return True
        if not (lo < node.val < hi):
            return False
        return ok(node.left, lo, node.val) and ok(node.right, node.val, hi)
    return ok(root, float("-inf"), float("inf"))
