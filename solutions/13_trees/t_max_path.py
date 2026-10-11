"""Reference solution · t-max-path · Maximum Path Sum

Complexity: O(n)

Approach: Postorder gains + global best.

Common mistakes:
- Returning a path that branches (both children) to the parent.
- Not ignoring negative child contributions (use max(0, gain)).

Follow-up challenge: Return the path’s nodes, not just its sum.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def max_path_sum(root):
    best = float("-inf")
    def gain(node):                      # best downward path starting at node
        nonlocal best
        if node is None:
            return 0
        left = max(gain(node.left), 0)   # ignore negative branches
        right = max(gain(node.right), 0)
        best = max(best, node.val + left + right)
        return node.val + max(left, right)
    gain(root)
    return best
