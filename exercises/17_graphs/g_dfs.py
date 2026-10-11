"""g-dfs · DFS Order
Topic 17: Graphs · easy · DFS

Return the recursive DFS (preorder) visiting order from `start`, visiting
neighbours in the given order.

Examples:
    dfs_order({"A": ["B", "C"], "B": ["D"], "C": ["E"], "D": [], "E": []}, "A")  ->  ["A", "B", "D", "C", "E"]
    dfs_order({1: [2], 2: [3], 3: [1]}, 1)  ->  [1, 2, 3]
    dfs_order({0: []}, 0)  ->  [0]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ number of nodes ≤ 1000

Target complexity: O(V + E)

Check your work:   python dsa.py test g-dfs
Stuck?             python dsa.py hint g-dfs
"""


def dfs_order(adj, start):
    pass
