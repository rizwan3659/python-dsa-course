"""Reference solution · bst-lca · Lowest Common Ancestor in a BST

Complexity: O(h)

Approach: Walk down until p and q are on different sides.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def lca_bst(root, p, q):
    node = root
    while node:
        if p < node.val and q < node.val:
            node = node.left
        elif p > node.val and q > node.val:
            node = node.right
        else:
            return node.val          # p and q split here (or one of them is here)
