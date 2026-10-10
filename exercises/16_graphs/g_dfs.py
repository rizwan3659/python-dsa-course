"""g-dfs · DFS Order
Topic 16: Graphs · easy · DFS

Return the recursive DFS (preorder) visiting order from `start`, visiting
neighbours in the given order.

Examples:
    dfs_order({"A": ["B", "C"], "B": ["D"], "C": ["E"], "D": [], "E": []}, "A")  ->  ["A", "B", "D", "C", "E"]
    dfs_order({1: [2], 2: [3], 3: [1]}, 1)  ->  [1, 2, 3]

Target complexity: O(V + E)

Check your work:   python dsa.py test g-dfs
Stuck?             python dsa.py hint g-dfs
"""


def dfs_order(adj, start):
    pass
