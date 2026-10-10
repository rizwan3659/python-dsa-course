"""t-d2 · Counting nodes, minus some
Topic 13: Trees · easy · Tree Recursion · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    count(build_tree([1, 2, 3]))  ->  3
    count(build_tree([]))  ->  0

Check your work:   python dsa.py test t-d2
Stuck?             python dsa.py hint t-d2
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def count(root):
    if root is None:
        return 0
    return count(root.left) + count(root.right)
