"""bst-lca · Lowest Common Ancestor in a BST
Topic 14: Binary Search Trees · medium · BST Property

Return the value of the lowest common ancestor of values p and q, using the
BST property (no need to search both subtrees).

Examples:
    lca_bst(build_tree([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]), 2, 8)  ->  6
    lca_bst(build_tree([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]), 2, 4)  ->  2
    lca_bst(build_tree([2, 1]), 2, 1)  ->  2

(1 more hidden test run when you check your work.)

Constraints:
- 2 ≤ number of nodes ≤ 10^5
- p and q exist

Target complexity: O(h)

Check your work:   python dsa.py test bst-lca
Stuck?             python dsa.py hint bst-lca
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def lca_bst(root, p, q):
    pass
