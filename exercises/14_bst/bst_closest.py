"""bst-closest · Closest Value
Topic 14: Binary Search Trees · easy · BST Property

Return the value in the BST closest to a float target (the smaller one on a
tie).

Examples:
    closest_value(build_tree([4, 2, 5, 1, 3]), 3.714286)  ->  4
    closest_value(build_tree([1]), 4.4)  ->  1
    closest_value(build_tree([4, 2, 5, 1, 3]), 3.5)  ->  3

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ number of nodes ≤ 10^4

Target complexity: O(h)

Check your work:   python dsa.py test bst-closest
Stuck?             python dsa.py hint bst-closest
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def closest_value(root, target):
    pass
