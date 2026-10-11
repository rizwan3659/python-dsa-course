"""t-subtree · Subtree of Another Tree
Topic 13: Trees · medium · Tree Recursion

Return True if `sub` appears in `root` as a node together with all its
descendants.

Examples:
    is_subtree(build_tree([3, 4, 5, 1, 2]), build_tree([4, 1, 2]))  ->  True
    is_subtree(build_tree([3, 4, 5, 1, 2, None, None, None, None, 0]), build_tree([4, 1, 2]))  ->  False
    is_subtree(build_tree([1, 1]), build_tree([1]))  ->  True

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ nodes in root ≤ 2000, 1 ≤ nodes in sub ≤ 1000

Target complexity: O(n · m)

Check your work:   python dsa.py test t-subtree
Stuck?             python dsa.py hint t-subtree
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def is_subtree(root, sub):
    pass
