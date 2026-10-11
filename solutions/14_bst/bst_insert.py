"""Reference solution · bst-insert · Insert into a BST

Complexity: O(h)

Approach: Recursive insert returning the subtree root.

Common mistakes:
- Forgetting to return the root after inserting.
- Replacing an existing child instead of walking further down.

Follow-up challenge: Insert a value that may already exist (ignore
duplicates).
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def insert_bst(root, v):
    if root is None:
        return TreeNode(v)
    if v < root.val:
        root.left = insert_bst(root.left, v)
    else:
        root.right = insert_bst(root.right, v)
    return root
