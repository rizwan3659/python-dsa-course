"""bst-min-max · Minimum and Maximum
Topic 14: Binary Search Trees · easy · BST Property

Return `(min, max)` of a non-empty BST in O(h).

Examples:
    min_max(build_tree([8, 4, 12, 2, 6, 10, 14]))  ->  (2, 14)
    min_max(build_tree([5]))  ->  (5, 5)
    min_max(build_tree([5, 3, None, 1]))  ->  (1, 5)

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ number of nodes ≤ 10^4

Target complexity: O(h)

Check your work:   python dsa.py test bst-min-max
Stuck?             python dsa.py hint bst-min-max
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def min_max(root):
    pass
