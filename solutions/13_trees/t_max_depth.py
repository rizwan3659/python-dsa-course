"""Reference solution · t-max-depth · Maximum Depth

Complexity: O(n)

Approach: 1 + the deeper subtree.

Common mistakes:
- Returning 1 for an empty tree.
- Counting edges instead of nodes.

Follow-up challenge: Solve it iteratively with BFS, counting levels.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
