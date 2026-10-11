"""t-same · Same Tree
Topic 13: Trees · easy · Tree Recursion

Return True if two trees have the same shape and values.

Examples:
    is_same(build_tree([1, 2, 3]), build_tree([1, 2, 3]))  ->  True
    is_same(build_tree([1, 2]), build_tree([1, None, 2]))  ->  False
    is_same(build_tree([]), build_tree([]))  ->  True

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 100

Target complexity: O(n)

Check your work:   python dsa.py test t-same
Stuck?             python dsa.py hint t-same
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_same(p, q):
    pass
