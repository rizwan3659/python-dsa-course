"""t-max-path · Maximum Path Sum
Topic 13: Trees · hard · Tree Recursion

A path is any sequence of connected nodes (it does not need to pass through
the root). Return the maximum sum of a non-empty path.

Examples:
    max_path_sum(build_tree([1, 2, 3]))  ->  6
    max_path_sum(build_tree([-10, 9, 20, None, None, 15, 7]))  ->  42
    max_path_sum(build_tree([-3]))  ->  -3

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ number of nodes ≤ 3 × 10^4

Target complexity: O(n)

Check your work:   python dsa.py test t-max-path
Stuck?             python dsa.py hint t-max-path
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def max_path_sum(root):
    pass
