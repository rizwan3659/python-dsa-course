"""Reference solution · t-min-depth · Minimum Depth

Complexity: O(n)

Approach: BFS to the first leaf.

Common mistakes:
- Taking min(left, right) when one side is empty (a node with one child is
  not a leaf).

Follow-up challenge: Solve it with BFS, stopping at the first leaf.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def min_depth(root):
    if not root:
        return 0
    queue = deque([(root, 1)])
    while queue:
        node, d = queue.popleft()
        if not node.left and not node.right:
            return d                      # first leaf found by BFS is the shallowest
        for child in (node.left, node.right):
            if child:
                queue.append((child, d + 1))
