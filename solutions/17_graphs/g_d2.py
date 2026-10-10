"""Reference solution · g-d2 · Visited too late
"""


from collections import deque

def bfs(adj, start):
    seen, queue, order = {start}, deque([start]), []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                queue.append(v)
    return order
