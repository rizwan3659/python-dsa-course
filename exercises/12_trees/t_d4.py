"""t-d4 · Path sum that is not a path
Topic 12: Trees · medium · Tree Recursion · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    has_path_sum(build_tree([1, 2]), 1)  ->  False
    has_path_sum(build_tree([1, 2]), 3)  ->  True
    has_path_sum(build_tree([]), 0)  ->  False

Check your work:   python dsa.py test t-d4
Stuck?             python dsa.py hint t-d4
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def has_path_sum(root, target):
    if root is None:
        return target == 0
    target -= root.val
    return has_path_sum(root.left, target) or has_path_sum(root.right, target)
