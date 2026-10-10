"""t-d3 · Level order out of order
Topic 13: Trees · easy · BFS · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    level_order(build_tree([1, 2, 3, 4, 5]))  ->  [1, 2, 3, 4, 5]

Check your work:   python dsa.py test t-d3
Stuck?             python dsa.py hint t-d3
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def level_order(root):
    out, todo = [], [root]
    while todo:
        node = todo.pop()
        out.append(node.val)
        if node.left:
            todo.append(node.left)
        if node.right:
            todo.append(node.right)
    return out
