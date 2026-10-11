"""Reference solution · g-has-path · Find if a Path Exists

Complexity: O(V + E)

Approach: Graph search.

Common mistakes:
- Recursion deeper than Python’s limit on long chains (use a stack or BFS).
- Treating edges as one-way.

Follow-up challenge: Answer many (source, dest) queries quickly with
union-find.
"""


from collections import deque

def valid_path(n, edges, source, dest):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    seen, queue = {source}, deque([source])
    while queue:
        u = queue.popleft()
        if u == dest:
            return True
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                queue.append(v)
    return False
