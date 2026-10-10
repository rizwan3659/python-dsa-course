"""bst-validate · Validate a BST
Topic 13: Binary Search Trees · medium · BST Property

Return True if the tree is a valid BST (strictly smaller left, strictly
larger right, for all descendants).

Examples:
    is_valid_bst(build_tree([2, 1, 3]))  ->  True
    is_valid_bst(build_tree([5, 1, 4, None, None, 3, 6]))  ->  False
    is_valid_bst(build_tree([5, 4, 6, None, None, 3, 7]))  ->  False

(2 more hidden tests run when you check your work.)

Target complexity: O(n)

Check your work:   python dsa.py test bst-validate
Stuck?             python dsa.py hint bst-validate
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_valid_bst(root):
    pass
