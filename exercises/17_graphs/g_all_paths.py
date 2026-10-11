"""g-all-paths · All Paths From Source to Target
Topic 17: Graphs · medium · Backtracking

A DAG with nodes 0..n − 1; `graph[i]` lists i’s successors. Return all paths
from 0 to n − 1 (in DFS order).

Examples:
    all_paths([[1, 2], [3], [3], []])  ->  [[0, 1, 3], [0, 2, 3]]
    all_paths([[4, 3, 1], [3, 2, 4], [3], [4], []])  ->  [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]]
    all_paths([[1], []])  ->  [[0, 1]]

(1 more hidden test run when you check your work.)

Constraints:
- 2 ≤ n ≤ 15

Target complexity: Exponential in the worst case (number of paths)

Check your work:   python dsa.py test g-all-paths
Stuck?             python dsa.py hint g-all-paths
"""


def all_paths(graph):
    pass
