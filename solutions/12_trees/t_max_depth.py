"""Reference solution · t-max-depth · Maximum Depth

Complexity: O(n)

Approach: 1 + the deeper subtree.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
