"""Reference solution · bst-search · Search in a BST

Complexity: O(h)

Approach: Walk one path.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def search_bst(root, target):
    while root and root.val != target:
        root = root.left if target < root.val else root.right
    return root
