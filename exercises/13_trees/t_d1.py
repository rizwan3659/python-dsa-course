"""t-d1 · Crash at the bottom
Topic 13: Trees · easy · Tree Recursion · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    max_depth(build_tree([1, 2]))  ->  2

Check your work:   python dsa.py test t-d1
Stuck?             python dsa.py hint t-d1
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def max_depth(root):
    return 1 + max(max_depth(root.left), max_depth(root.right))
