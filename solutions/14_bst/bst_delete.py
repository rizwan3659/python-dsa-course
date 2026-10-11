"""Reference solution · bst-delete · Delete Node in a BST

Complexity: O(h)

Approach: Recursive delete with the in-order successor.

Common mistakes:
- Losing the subtree of a node with one child.
- For two children, forgetting to delete the successor from the right
  subtree.

Follow-up challenge: Delete all nodes in a value range.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def delete_node(root, key):
    if root is None:
        return None
    if key < root.val:
        root.left = delete_node(root.left, key)
    elif key > root.val:
        root.right = delete_node(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        succ = root.right
        while succ.left:
            succ = succ.left
        root.val = succ.val
        root.right = delete_node(root.right, succ.val)
    return root
