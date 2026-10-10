"""g-d2 · Visited too late
Topic 17: Graphs · medium · BFS · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    bfs({0: [1, 2], 1: [3], 2: [3], 3: []}, 0)  ->  [0, 1, 2, 3]

Check your work:   python dsa.py test g-d2
Stuck?             python dsa.py hint g-d2
"""


from collections import deque

def bfs(adj, start):
    seen, queue, order = set(), deque([start]), []
    while queue:
        u = queue.popleft()
        seen.add(u)
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                queue.append(v)
    return order
