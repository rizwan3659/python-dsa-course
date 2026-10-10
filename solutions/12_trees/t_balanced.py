"""Reference solution · t-balanced · Balanced Binary Tree

Complexity: O(n)

Approach: One postorder pass returning height or −1.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_balanced(root):
    def check(node):                     # height, or -1 if unbalanced
        if node is None:
            return 0
        left = check(node.left)
        if left == -1:
            return -1
        right = check(node.right)
        if right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    return check(root) != -1
