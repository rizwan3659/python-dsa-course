"""Reference solution · bst-recover · Recover a BST

Complexity: O(n) time, O(h) space (Morris traversal makes it O(1))

Approach: Inorder traversal, remember the nodes at the order violations,
swap their values.

Common mistakes:
- Handling only the case of two drops: adjacent swapped nodes give a single
  drop.
- Swapping nodes instead of values (much harder, and not needed).

Follow-up challenge: Do it with O(1) extra space using Morris inorder
traversal.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def recover_tree(root):
    first = second = prev = None
    stack, node = [], root
    while stack or node:                  # iterative inorder: values should increase
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        if prev and prev.val > node.val:  # a "drop" in the sorted order
            if first is None:
                first = prev
            second = node
        prev = node
        node = node.right
    first.val, second.val = second.val, first.val
    return root
