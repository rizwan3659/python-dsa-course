"""t-symmetric · Symmetric Tree
Topic 13: Trees · easy · Tree Recursion

Return True if the tree is a mirror of itself.

Examples:
    is_symmetric(build_tree([1, 2, 2, 3, 4, 4, 3]))  ->  True
    is_symmetric(build_tree([1, 2, 2, None, 3, None, 3]))  ->  False
    is_symmetric(build_tree([]))  ->  True

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 1000

Target complexity: O(n)

Check your work:   python dsa.py test t-symmetric
Stuck?             python dsa.py hint t-symmetric
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_symmetric(root):
    pass
