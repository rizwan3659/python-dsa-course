"""Reference solution · t-avg-levels · Average of Levels

Complexity: O(n)

Approach: BFS by levels.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def average_of_levels(root):
    out, queue = [], deque([root]) if root else deque()
    while queue:
        size, total = len(queue), 0
        for _ in range(size):
            node = queue.popleft()
            total += node.val
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        out.append(total / size)
    return out
