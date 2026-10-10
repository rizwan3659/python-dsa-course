"""Reference solution · bst-d1 · Only checking the children
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_valid_bst(root, lo=float("-inf"), hi=float("inf")):
    if root is None:
        return True
    if not (lo < root.val < hi):
        return False
    return is_valid_bst(root.left, lo, root.val) and is_valid_bst(root.right, root.val, hi)
