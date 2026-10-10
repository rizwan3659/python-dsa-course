"""t-paths · All Root-to-Leaf Paths
Topic 12: Trees · medium · Backtracking

Return every root-to-leaf path as a string like `"1->2->5"`, left to right.

Examples:
    binary_tree_paths(build_tree([1, 2, 3, None, 5]))  ->  ["1->2->5", "1->3"]
    binary_tree_paths(build_tree([1]))  ->  ["1"]
    binary_tree_paths(build_tree([]))  ->  []

Target complexity: O(n · h)

Check your work:   python dsa.py test t-paths
Stuck?             python dsa.py hint t-paths
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def binary_tree_paths(root):
    pass
