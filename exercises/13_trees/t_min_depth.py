"""t-min-depth · Minimum Depth
Topic 13: Trees · easy · BFS

Return the number of nodes on the shortest path from the root to a leaf.

Examples:
    min_depth(build_tree([3, 9, 20, None, None, 15, 7]))  ->  2
    min_depth(build_tree([2, None, 3, None, 4, None, 5, None, 6]))  ->  5
    min_depth(build_tree([]))  ->  0

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4

Target complexity: O(n)

Check your work:   python dsa.py test t-min-depth
Stuck?             python dsa.py hint t-min-depth
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def min_depth(root):
    pass
