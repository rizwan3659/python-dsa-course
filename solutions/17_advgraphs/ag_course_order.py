"""Reference solution · ag-course-order · Course Schedule II

Complexity: O(V + E)

Approach: Kahn’s topological sort.
"""


from collections import deque

def find_order(n, prereqs):
    graph, indeg = {i: [] for i in range(n)}, [0] * n
    for a, b in prereqs:
        graph[b].append(a)
        indeg[a] += 1
    queue = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return order if len(order) == n else []
