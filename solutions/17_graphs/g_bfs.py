"""Reference solution · g-bfs · BFS Order

Complexity: O(V + E)

Approach: Standard BFS.
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
