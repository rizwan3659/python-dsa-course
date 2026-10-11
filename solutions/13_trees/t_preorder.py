"""Reference solution · t-preorder · Preorder Traversal

Complexity: O(n)

Approach: Recursive DFS (or an explicit stack).

Common mistakes:
- Appending the root after the children (that is postorder).
- Forgetting the None base case.

Follow-up challenge: Write it iteratively with a stack.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def preorder(root):
    if root is None:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)
