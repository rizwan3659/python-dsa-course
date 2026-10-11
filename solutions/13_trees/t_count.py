"""Reference solution · t-count · Count Nodes

Complexity: O(n)

Approach: Tree recursion.

Common mistakes:
- Forgetting to count the node itself.
- Returning 1 for an empty tree.

Follow-up challenge: Count the nodes of a complete binary tree in O(log² n).
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def count_nodes(root):
    if root is None:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)
