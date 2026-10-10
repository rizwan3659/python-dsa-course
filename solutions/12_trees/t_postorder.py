"""Reference solution · t-postorder · Postorder Traversal

Complexity: O(n)

Approach: Recursive DFS.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def postorder(root):
    if root is None:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]
