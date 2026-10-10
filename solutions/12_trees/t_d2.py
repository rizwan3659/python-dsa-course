"""Reference solution · t-d2 · Counting nodes, minus some
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def count(root):
    if root is None:
        return 0
    return 1 + count(root.left) + count(root.right)
