"""Reference solution · bst-kth · Kth Smallest in a BST

Complexity: O(h + k)

Approach: Inorder traversal, stop at the k-th visit.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def kth_smallest(root, k):
    stack, node = [], root
    while True:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val
        node = node.right
