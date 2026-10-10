"""t-symmetric · Symmetric Tree
Topic 12: Trees · easy · Tree Recursion

Return True if the tree is a mirror of itself.

Examples:
    is_symmetric(build_tree([1, 2, 2, 3, 4, 4, 3]))  ->  True
    is_symmetric(build_tree([1, 2, 2, None, 3, None, 3]))  ->  False
    is_symmetric(build_tree([]))  ->  True

Target complexity: O(n)

Check your work:   python dsa.py test t-symmetric
Stuck?             python dsa.py hint t-symmetric
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_symmetric(root):
    pass
