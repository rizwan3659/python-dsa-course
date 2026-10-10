"""Reference solution · t-diameter · Diameter of a Binary Tree

Complexity: O(n)

Approach: Postorder heights + a running maximum.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def diameter(root):
    best = 0
    def height(node):
        nonlocal best
        if node is None:
            return 0
        left, right = height(node.left), height(node.right)
        best = max(best, left + right)      # longest path bending at this node
        return 1 + max(left, right)
    height(root)
    return best
