"""bst-search · Search in a BST
Topic 14: Binary Search Trees · easy · BST Property

Return the node with value target (or None). Use the BST property: O(h).

Examples:
    tree_to_list(search_bst(build_tree([4, 2, 7, 1, 3]), 2))  ->  [2, 1, 3]
    search_bst(build_tree([4, 2, 7, 1, 3]), 5)  ->  None
    search_bst(build_tree([]), 1)  ->  None

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4

Target complexity: O(h)

Check your work:   python dsa.py test bst-search
Stuck?             python dsa.py hint bst-search
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def search_bst(root, target):
    pass
