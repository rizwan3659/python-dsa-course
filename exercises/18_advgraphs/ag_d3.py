"""ag-d3 · A cycle goes unnoticed
Topic 18: Advanced Graphs · medium · Topological Sort · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    course_order(3, [[1, 0], [0, 1]])  ->  []
    course_order(2, [[1, 0]])  ->  [0, 1]

Check your work:   python dsa.py test ag-d3
Stuck?             python dsa.py hint ag-d3
"""


from collections import deque

def course_order(n, prereqs):          # [a, b] means b before a
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
    return order
