"""Reference solution · t-preorder · Preorder Traversal

Complexity: O(n)

Approach: Recursive DFS (or an explicit stack).
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def preorder(root):
    if root is None:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)
