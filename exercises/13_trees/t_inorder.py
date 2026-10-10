"""t-inorder · Inorder Traversal
Topic 13: Trees · easy · DFS

Return the inorder traversal (left, root, right). Bonus: do it without
recursion, using a stack.

Examples:
    inorder(build_tree([1, None, 2, 3]))  ->  [1, 3, 2]
    inorder(build_tree([1, 2, 3, 4, 5]))  ->  [4, 2, 5, 1, 3]
    inorder(build_tree([]))  ->  []

Target complexity: O(n)

Check your work:   python dsa.py test t-inorder
Stuck?             python dsa.py hint t-inorder
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def inorder(root):
    pass
