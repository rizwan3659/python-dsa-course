"""ag-bellman · Shortest Paths With Negative Weights
Topic 18: Advanced Graphs · hard · Shortest Path

Directed edges `(u, v, w)`, weights may be negative. Return the list of
shortest distances from node 0 (use `None` for unreachable), or the string
`"negative cycle"` if one is reachable.

Examples:
    bellman_ford(4, [(0, 1, 4), (0, 2, 5), (1, 2, -3), (2, 3, 2)])  ->  [0, 4, 1, 3]
    bellman_ford(3, [(0, 1, 1), (1, 2, -1), (2, 1, -1)])  ->  "negative cycle"
    bellman_ford(3, [(0, 1, 2)])  ->  [0, 2, None]

Target complexity: O(V · E)

Check your work:   python dsa.py test ag-bellman
Stuck?             python dsa.py hint ag-bellman
"""


def bellman_ford(n, edges):
    pass
