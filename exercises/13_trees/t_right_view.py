"""t-right-view · Right Side View
Topic 13: Trees · medium · BFS

Return the values you would see standing on the right of the tree, top to
bottom.

Examples:
    right_side_view(build_tree([1, 2, 3, None, 5, None, 4]))  ->  [1, 3, 4]
    right_side_view(build_tree([1, 2, 3, 4]))  ->  [1, 3, 4]
    right_side_view(build_tree([]))  ->  []

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 100

Target complexity: O(n)

Check your work:   python dsa.py test t-right-view
Stuck?             python dsa.py hint t-right-view
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def right_side_view(root):
    pass
