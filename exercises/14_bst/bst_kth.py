"""bst-kth · Kth Smallest in a BST
Topic 14: Binary Search Trees · medium · BST Property

Return the k-th smallest value (1-based).

Examples:
    kth_smallest(build_tree([3, 1, 4, None, 2]), 1)  ->  1
    kth_smallest(build_tree([5, 3, 6, 2, 4, None, None, 1]), 3)  ->  3
    kth_smallest(build_tree([5, 3, 6, 2, 4, None, None, 1]), 6)  ->  6

Target complexity: O(h + k)

Check your work:   python dsa.py test bst-kth
Stuck?             python dsa.py hint bst-kth
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def kth_smallest(root, k):
    pass
