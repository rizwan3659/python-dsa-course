"""Reference solution · ag-can-finish · Course Schedule

Complexity: O(V + E)

Approach: Topological sort / cycle check.

Common mistakes:
- Building edges in the wrong direction.
- Only detecting cycles reachable from course 0.

Follow-up challenge: Return one cycle when finishing is impossible.
"""


from collections import deque

def can_finish(n, prereqs):
    graph, indeg = {i: [] for i in range(n)}, [0] * n
    for a, b in prereqs:
        graph[b].append(a)
        indeg[a] += 1
    queue = deque(i for i in range(n) if indeg[i] == 0)
    taken = 0
    while queue:
        u = queue.popleft()
        taken += 1
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return taken == n
