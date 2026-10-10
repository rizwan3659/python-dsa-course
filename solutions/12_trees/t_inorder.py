"""Reference solution · t-inorder · Inorder Traversal

Complexity: O(n)

Approach: Recursion, or a stack simulating it.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def inorder(root):
    out, stack, node = [], [], root
    while stack or node:
        while node:                  # go as far left as possible
            stack.append(node)
            node = node.left
        node = stack.pop()
        out.append(node.val)
        node = node.right
    return out
