"""Reference solution · bst-min-max · Minimum and Maximum

Complexity: O(h)

Approach: Walk left; walk right.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def min_max(root):
    lo = hi = root
    while lo.left:
        lo = lo.left
    while hi.right:
        hi = hi.right
    return (lo.val, hi.val)
