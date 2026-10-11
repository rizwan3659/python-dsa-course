"""t-balanced · Balanced Binary Tree
Topic 13: Trees · medium · Tree Recursion

A tree is height-balanced if, at every node, the subtree heights differ by
at most 1. Check it in O(n).

Examples:
    is_balanced(build_tree([3, 9, 20, None, None, 15, 7]))  ->  True
    is_balanced(build_tree([1, 2, 2, 3, 3, None, None, 4, 4]))  ->  False
    is_balanced(build_tree([]))  ->  True

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 5000

Target complexity: O(n)

Check your work:   python dsa.py test t-balanced
Stuck?             python dsa.py hint t-balanced
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_balanced(root):
    pass
