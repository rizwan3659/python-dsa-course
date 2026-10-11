"""Reference solution · t-leaves · Sum of Leaves

Complexity: O(n)

Approach: Recursion with a leaf check.

Common mistakes:
- Counting nodes with one child as leaves.
- Adding internal node values.

Follow-up challenge: Sum only the left leaves.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def leaf_sum(root):
    if root is None:
        return 0
    if root.left is None and root.right is None:
        return root.val
    return leaf_sum(root.left) + leaf_sum(root.right)
