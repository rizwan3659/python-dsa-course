"""t-path-sum · Path Sum
Topic 13: Trees · easy · DFS

Return True if some root-to-leaf path adds up to target.

Examples:
    has_path_sum(build_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1]), 22)  ->  True
    has_path_sum(build_tree([1, 2, 3]), 5)  ->  False
    has_path_sum(build_tree([1, 2]), 1)  ->  False

(1 more hidden test run when you check your work.)

Target complexity: O(n)

Check your work:   python dsa.py test t-path-sum
Stuck?             python dsa.py hint t-path-sum
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def has_path_sum(root, target):
    pass
