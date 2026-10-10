"""bst-range-sum · Range Sum of a BST
Topic 13: Binary Search Trees · easy · BST Property

Return the sum of values in [low, high]. Skip subtrees that cannot contain
such values.

Examples:
    range_sum(build_tree([10, 5, 15, 3, 7, None, 18]), 7, 15)  ->  32
    range_sum(build_tree([10, 5, 15, 3, 7, 13, 18, 1, None, 6]), 6, 10)  ->  23
    range_sum(build_tree([]), 1, 2)  ->  0

Target complexity: O(n) worst, often much less

Check your work:   python dsa.py test bst-range-sum
Stuck?             python dsa.py hint bst-range-sum
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def range_sum(root, low, high):
    pass
