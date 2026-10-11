"""Reference solution · g-bfs · BFS Order

Complexity: O(V + E)

Approach: Standard BFS.

Common mistakes:
- Marking nodes as visited when they are popped instead of when they are
  queued (duplicates).
- Using list.pop(0).

Follow-up challenge: Return the distance of every node from start.
"""


from collections import deque

def bfs_order(adj, start):
    seen, queue, order = {start}, deque([start]), []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                queue.append(v)
    return order
