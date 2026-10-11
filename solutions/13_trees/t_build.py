"""Reference solution · t-build · Build Tree From Preorder and Inorder

Complexity: O(n)

Approach: Recursive split using preorder roots and inorder positions.

Common mistakes:
- Using inorder.index() in every call: O(n²).
- Mixing up the sizes of the left and right parts.

Follow-up challenge: Rebuild from inorder and postorder instead.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def build_from(preorder, inorder):
    pos = {v: i for i, v in enumerate(inorder)}
    it = iter(preorder)
    def make(lo, hi):                    # build from inorder[lo..hi]
        if lo > hi:
            return None
        val = next(it)                   # preorder gives roots in order
        node = TreeNode(val)
        node.left = make(lo, pos[val] - 1)
        node.right = make(pos[val] + 1, hi)
        return node
    return make(0, len(inorder) - 1)
