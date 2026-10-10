"""Reference solution · t-path-sum · Path Sum

Complexity: O(n)

Approach: DFS carrying the remaining sum.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def has_path_sum(root, target):
    if root is None:
        return False
    target -= root.val
    if root.left is None and root.right is None:
        return target == 0
    return has_path_sum(root.left, target) or has_path_sum(root.right, target)
