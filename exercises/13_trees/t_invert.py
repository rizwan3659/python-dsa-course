"""t-invert · Invert Binary Tree
Topic 13: Trees · easy · Tree Recursion

Mirror the tree (swap every left and right child) and return its root.

Examples:
    tree_to_list(invert_tree(build_tree([4, 2, 7, 1, 3, 6, 9])))  ->  [4, 7, 2, 9, 6, 3, 1]
    tree_to_list(invert_tree(build_tree([2, 1, 3])))  ->  [2, 3, 1]
    tree_to_list(invert_tree(build_tree([])))  ->  []

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 100

Target complexity: O(n)

Check your work:   python dsa.py test t-invert
Stuck?             python dsa.py hint t-invert
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def invert_tree(root):
    pass
