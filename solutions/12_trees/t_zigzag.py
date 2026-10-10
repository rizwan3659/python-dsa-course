"""Reference solution · t-zigzag · Zigzag Level Order

Complexity: O(n)

Approach: BFS by levels + a direction flag.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def zigzag(root):
    out, queue, left_to_right = [], deque([root]) if root else deque(), True
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        out.append(level if left_to_right else level[::-1])
        left_to_right = not left_to_right
    return out
