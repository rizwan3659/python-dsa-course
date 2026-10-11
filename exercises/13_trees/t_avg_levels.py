"""t-avg-levels · Average of Levels
Topic 13: Trees · easy · BFS

Return the average value of each level, top to bottom.

Examples:
    average_of_levels(build_tree([3, 9, 20, None, None, 15, 7]))  ->  [3.0, 14.5, 11.0]
    average_of_levels(build_tree([]))  ->  []
    average_of_levels(build_tree([1, 2, 3]))  ->  [1.0, 2.5]

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4

Target complexity: O(n)

Check your work:   python dsa.py test t-avg-levels
Stuck?             python dsa.py hint t-avg-levels
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def average_of_levels(root):
    pass
