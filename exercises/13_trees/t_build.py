"""t-build · Build Tree From Preorder and Inorder
Topic 13: Trees · hard · Divide & Conquer

Values are distinct. Rebuild the tree from its preorder and inorder
traversals.

Examples:
    tree_to_list(build_from([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))  ->  [3, 9, 20, None, None, 15, 7]
    tree_to_list(build_from([1, 2], [2, 1]))  ->  [1, 2]
    tree_to_list(build_from([], []))  ->  []

Target complexity: O(n)

Check your work:   python dsa.py test t-build
Stuck?             python dsa.py hint t-build
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def build_from(preorder, inorder):
    pass
