"""Reference solution · t-invert · Invert Binary Tree

Complexity: O(n)

Approach: Recursive swap.

Common mistakes:
- Swapping only the root’s children.
- Overwriting one child before saving it.

Follow-up challenge: Do it iteratively with a queue.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def invert_tree(root):
    if root:
        root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root
