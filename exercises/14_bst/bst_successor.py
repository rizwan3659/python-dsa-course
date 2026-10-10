"""bst-successor · Inorder Successor
Topic 14: Binary Search Trees · medium · BST Property

Return the smallest value strictly greater than x, or None, in O(h).

Examples:
    successor(build_tree([8, 4, 12, 2, 6, 10, 14]), 6)  ->  8
    successor(build_tree([8, 4, 12, 2, 6, 10, 14]), 8)  ->  10
    successor(build_tree([8, 4, 12, 2, 6, 10, 14]), 14)  ->  None

(1 more hidden test run when you check your work.)

Target complexity: O(h)

Check your work:   python dsa.py test bst-successor
Stuck?             python dsa.py hint bst-successor
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def successor(root, x):
    pass
