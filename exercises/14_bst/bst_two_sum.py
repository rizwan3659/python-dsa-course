"""bst-two-sum · Two Sum in a BST
Topic 14: Binary Search Trees · medium · Two Pointers

Return True if two different nodes sum to k.

Examples:
    find_target(build_tree([5, 3, 6, 2, 4, None, 7]), 9)  ->  True
    find_target(build_tree([5, 3, 6, 2, 4, None, 7]), 28)  ->  False
    find_target(build_tree([1]), 2)  ->  False

(2 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ number of nodes ≤ 10^4

Target complexity: O(n)

Check your work:   python dsa.py test bst-two-sum
Stuck?             python dsa.py hint bst-two-sum
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def find_target(root, k):
    pass
