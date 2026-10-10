"""Reference solution · bst-d3 · Searching the wrong way
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def contains(root, target):
    while root:
        if root.val == target:
            return True
        root = root.left if target < root.val else root.right
    return False
