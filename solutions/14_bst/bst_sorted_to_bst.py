"""Reference solution · bst-sorted-to-bst · Sorted List to Balanced BST

Complexity: O(n)

Approach: Divide and conquer on the middle element.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def sorted_to_bst(nums):
    def build(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        node = TreeNode(nums[mid])       # the middle becomes the root
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        return node
    return build(0, len(nums) - 1)
