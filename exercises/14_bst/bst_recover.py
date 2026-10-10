"""bst-recover · Recover a BST
Topic 14: Binary Search Trees · hard · BST Property

Exactly two nodes of a binary search tree were swapped by mistake. Fix the
tree in place by swapping their values back, and return the root.

Examples:
    tree_to_list(recover_tree(build_tree([1, 3, None, None, 2])))  ->  [3, 1, None, None, 2]
    tree_to_list(recover_tree(build_tree([3, 1, 4, None, None, 2])))  ->  [2, 1, 4, None, None, 3]
    tree_to_list(recover_tree(build_tree([2, 3, 1])))  ->  [2, 1, 3]

(2 more hidden tests run when you check your work.)

Constraints:
- 2 ≤ number of nodes ≤ 1000
- values are distinct

Before this: bst-m1

Target complexity: O(n) time, O(h) space (Morris traversal makes it O(1))

Check your work:   python dsa.py test bst-recover
Stuck?             python dsa.py hint bst-recover
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def recover_tree(root):
    # your code here
    pass
