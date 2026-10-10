"""Reference solution · t-lca · Lowest Common Ancestor

Complexity: O(n)

Approach: Postorder: return the found node upward; the first node with hits
on both sides is the LCA.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def lca(root, p, q):
    def go(node):
        if node is None or node.val in (p, q):
            return node
        left, right = go(node.left), go(node.right)
        if left and right:
            return node              # p and q are on different sides
        return left or right
    return go(root).val
