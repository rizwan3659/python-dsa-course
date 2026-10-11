"""Reference solution · t-right-view · Right Side View

Complexity: O(n)

Approach: BFS by levels.

Common mistakes:
- Following only right children (left nodes can be visible).
- Taking the first node of each level instead of the last.

Follow-up challenge: Return the left side view.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def right_side_view(root):
    out, queue = [], deque([root]) if root else deque()
    while queue:
        for i in range(len(queue)):
            node = queue.popleft()
            if i == 0:
                out.append(node.val)          # we enqueue right child first
            if node.right:
                queue.append(node.right)
            if node.left:
                queue.append(node.left)
    return out
