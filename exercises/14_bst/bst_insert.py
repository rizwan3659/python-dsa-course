"""bst-insert · Insert into a BST
Topic 14: Binary Search Trees · easy · BST Property

Insert value v (not already present) and return the root.

Examples:
    tree_to_list(insert_bst(build_tree([4, 2, 7, 1, 3]), 5))  ->  [4, 2, 7, 1, 3, 5]
    tree_to_list(insert_bst(None, 3))  ->  [3]
    tree_to_list(insert_bst(build_tree([4, 2, 7]), 1))  ->  [4, 2, 7, 1]

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4
- v is not already in the tree

Target complexity: O(h)

Check your work:   python dsa.py test bst-insert
Stuck?             python dsa.py hint bst-insert
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def insert_bst(root, v):
    pass
