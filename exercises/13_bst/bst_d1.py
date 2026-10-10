"""bst-d1 · Only checking the children
Topic 13: Binary Search Trees · medium · BST Property · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    is_valid_bst(build_tree([5, 4, 6, None, None, 3, 7]))  ->  False
    is_valid_bst(build_tree([2, 1, 3]))  ->  True

Check your work:   python dsa.py test bst-d1
Stuck?             python dsa.py hint bst-d1
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_valid_bst(root):
    if root is None:
        return True
    if root.left and root.left.val >= root.val:
        return False
    if root.right and root.right.val <= root.val:
        return False
    return is_valid_bst(root.left) and is_valid_bst(root.right)
