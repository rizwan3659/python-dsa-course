"""t-zigzag · Zigzag Level Order
Topic 13: Trees · medium · BFS

Level order, but alternate direction each level: left→right, then
right→left, …

Examples:
    zigzag(build_tree([3, 9, 20, None, None, 15, 7]))  ->  [[3], [20, 9], [15, 7]]
    zigzag(build_tree([1, 2, 3, 4, 5, 6, 7]))  ->  [[1], [3, 2], [4, 5, 6, 7]]
    zigzag(build_tree([]))  ->  []

Target complexity: O(n)

Check your work:   python dsa.py test t-zigzag
Stuck?             python dsa.py hint t-zigzag
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def zigzag(root):
    pass
