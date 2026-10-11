"""Reference solution · g-bipartite · Is the Graph Bipartite?

Complexity: O(V + E)

Approach: BFS two-coloring per component.

Common mistakes:
- Only checking the component that contains node 0.
- Colouring without checking already-coloured neighbours.

Follow-up challenge: Return the two groups.
"""


from collections import deque

def is_bipartite(graph):
    color = {}
    for s in range(len(graph)):
        if s in color:
            continue
        color[s] = 0
        queue = deque([s])
        while queue:
            u = queue.popleft()
            for v in graph[u]:
                if v not in color:
                    color[v] = 1 - color[u]      # opposite group
                    queue.append(v)
                elif color[v] == color[u]:
                    return False
    return True
