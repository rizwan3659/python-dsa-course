"""Reference solution · bst-successor · Inorder Successor

Complexity: O(h)

Approach: Search path, remembering the last “went left” node.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def successor(root, x):
    best = None
    while root:
        if root.val > x:
            best = root.val      # candidate; a smaller one may be on the left
            root = root.left
        else:
            root = root.right
    return best
