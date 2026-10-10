"""t-lca · Lowest Common Ancestor
Topic 12: Trees · medium · Tree Recursion

Values are distinct. Return the value of the lowest node that has both p and
q as descendants (a node counts as its own descendant).

Examples:
    lca(build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4]), 5, 1)  ->  3
    lca(build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4]), 5, 4)  ->  5
    lca(build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4]), 6, 4)  ->  5

(1 more hidden test run when you check your work.)

Target complexity: O(n)

Check your work:   python dsa.py test t-lca
Stuck?             python dsa.py hint t-lca
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def lca(root, p, q):
    pass
