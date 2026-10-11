"""Reference solution · g-components · Number of Connected Components

Complexity: O(V + E)

Approach: Search from each unvisited node.

Common mistakes:
- Forgetting isolated nodes (they are components too).
- Starting a search only from node 0.

Follow-up challenge: Return the size of each component.
"""


def count_components(n, edges):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    seen, count = set(), 0
    for s in range(n):
        if s in seen:
            continue
        count += 1
        stack = [s]                      # iterative DFS: no recursion limit
        seen.add(s)
        while stack:
            u = stack.pop()
            for v in adj[u]:
                if v not in seen:
                    seen.add(v)
                    stack.append(v)
    return count
