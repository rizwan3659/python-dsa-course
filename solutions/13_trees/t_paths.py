"""Reference solution · t-paths · All Root-to-Leaf Paths

Complexity: O(n · h)

Approach: DFS with the current path.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def binary_tree_paths(root):
    out = []
    def dfs(node, path):
        if node is None:
            return
        path = path + [str(node.val)]
        if node.left is None and node.right is None:
            out.append("->".join(path))
        dfs(node.left, path)
        dfs(node.right, path)
    dfs(root, [])
    return out
