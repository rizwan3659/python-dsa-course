"""Reference solution · t-symmetric · Symmetric Tree

Complexity: O(n)

Approach: Mirror comparison helper.

Common mistakes:
- Comparing left with left instead of left with right.
- Checking only that each level is a palindrome (shape matters).

Follow-up challenge: Solve it iteratively with a queue of node pairs.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_symmetric(root):
    def mirror(a, b):
        if a is None or b is None:
            return a is b
        return a.val == b.val and mirror(a.left, b.right) and mirror(a.right, b.left)
    return mirror(root, root)
