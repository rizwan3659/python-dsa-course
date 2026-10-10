"""g-bfs · BFS Order
Topic 16: Graphs · easy · BFS

Return the BFS visiting order from `start`. `adj` is a dict of neighbour
lists; visit neighbours in the given order.

Examples:
    bfs_order({"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}, "A")  ->  ["A", "B", "C", "D"]
    bfs_order({1: [2], 2: [1]}, 1)  ->  [1, 2]
    bfs_order({0: []}, 0)  ->  [0]

Target complexity: O(V + E)

Check your work:   python dsa.py test g-bfs
Stuck?             python dsa.py hint g-bfs
"""


from collections import deque

def bfs_order(adj, start):
    pass
