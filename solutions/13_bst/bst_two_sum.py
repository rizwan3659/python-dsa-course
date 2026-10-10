"""Reference solution · bst-two-sum · Two Sum in a BST

Complexity: O(n)

Approach: Inorder + two pointers.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def find_target(root, k):
    vals = []
    def inorder(n):
        if n:
            inorder(n.left)
            vals.append(n.val)
            inorder(n.right)
    inorder(root)                       # sorted values
    i, j = 0, len(vals) - 1
    while i < j:
        s = vals[i] + vals[j]
        if s == k:
            return True
        if s < k:
            i += 1
        else:
            j -= 1
    return False
