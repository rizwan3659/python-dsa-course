"""Reference solution · bst-range-sum · Range Sum of a BST

Complexity: O(n) worst, often much less

Approach: DFS with pruning.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def range_sum(root, low, high):
    if root is None:
        return 0
    if root.val < low:
        return range_sum(root.right, low, high)    # whole left side is too small
    if root.val > high:
        return range_sum(root.left, low, high)
    return root.val + range_sum(root.left, low, high) + range_sum(root.right, low, high)
