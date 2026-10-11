"""Reference solution · bst-closest · Closest Value

Complexity: O(h)

Approach: Walk the search path, tracking the best.

Common mistakes:
- Exploring both subtrees.
- Ignoring the tie rule (return the smaller value).

Follow-up challenge: Return the k closest values.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def closest_value(root, target):
    best = root.val
    while root:
        if abs(root.val - target) < abs(best - target) or (abs(root.val - target) == abs(best - target) and root.val < best):
            best = root.val
        root = root.left if target < root.val else root.right
    return best
