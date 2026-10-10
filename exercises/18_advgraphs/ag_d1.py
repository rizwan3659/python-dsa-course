"""ag-d1 · BFS on weighted edges
Topic 18: Advanced Graphs · medium · Shortest Path · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    shortest({"A": [("B", 10), ("C", 1)], "C": [("B", 1)], "B": []}, "A")["B"]  ->  2

Check your work:   python dsa.py test ag-d1
Stuck?             python dsa.py hint ag-d1
"""


from collections import deque

def shortest(graph, start):
    dist = {start: 0}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v, w in graph[u]:
            if v not in dist:
                dist[v] = dist[u] + w
                queue.append(v)
    return dist
