"""Reference solution · t-d3 · Level order out of order
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def level_order(root):
    out, todo = [], deque([root])
    while todo:
        node = todo.popleft()
        out.append(node.val)
        if node.left:
            todo.append(node.left)
        if node.right:
            todo.append(node.right)
    return out
