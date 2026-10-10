"""t-level-order · Level Order Traversal
Topic 12: Trees · medium · BFS

Return the values level by level, as a list of lists.

`[3, 9, 20, None, None, 15, 7]` → `[[3], [9, 20], [15, 7]]`

Examples:
    level_order(build_tree([3, 9, 20, None, None, 15, 7]))  ->  [[3], [9, 20], [15, 7]]
    level_order(build_tree([1]))  ->  [[1]]
    level_order(build_tree([]))  ->  []

Target complexity: O(n)

Check your work:   python dsa.py test t-level-order
Stuck?             python dsa.py hint t-level-order
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def level_order(root):
    pass
