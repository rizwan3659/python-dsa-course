"""Reference solution · t-level-order · Level Order Traversal

Complexity: O(n)

Approach: BFS, one level per round.

Common mistakes:
- Mixing levels because you do not process the queue one level at a time.
- Using a list with pop(0): O(n) per pop.

Follow-up challenge: Return the levels bottom-up.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def level_order(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
