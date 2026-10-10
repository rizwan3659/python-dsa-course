"""bst-d3 · Searching the wrong way
Topic 13: Binary Search Trees · easy · BST Property · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    contains(build_tree([4, 2, 7]), 2)  ->  True
    contains(build_tree([4, 2, 7]), 7)  ->  True

Check your work:   python dsa.py test bst-d3
Stuck?             python dsa.py hint bst-d3
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def contains(root, target):
    while root:
        if root.val == target:
            return True
        root = root.right if target < root.val else root.left
    return False
