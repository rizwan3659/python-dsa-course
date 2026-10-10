"""bst-d2 · The new node vanishes
Topic 13: Binary Search Trees · easy · BST Property · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    tree_to_list(insert(build_tree([4]), 2))  ->  [4, 2]

Check your work:   python dsa.py test bst-d2
Stuck?             python dsa.py hint bst-d2
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def insert(root, v):
    if root is None:
        return TreeNode(v)
    if v < root.val:
        insert(root.left, v)
    else:
        insert(root.right, v)
    return root
