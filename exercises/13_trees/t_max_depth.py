"""t-max-depth · Maximum Depth
Topic 13: Trees · easy · Tree Recursion

Return the number of nodes on the longest root-to-leaf path.

Examples:
    max_depth(build_tree([3, 9, 20, None, None, 15, 7]))  ->  3
    max_depth(build_tree([1, None, 2]))  ->  2
    max_depth(build_tree([]))  ->  0

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4

Target complexity: O(n)

Check your work:   python dsa.py test t-max-depth
Stuck?             python dsa.py hint t-max-depth
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def max_depth(root):
    pass
