"""g-adj · Build an Adjacency List
Topic 17: Graphs · easy · DFS

Given n nodes (0..n − 1) and undirected edges, return a dict mapping each
node to a sorted list of neighbours.

Examples:
    adjacency(4, [(0, 1), (0, 2), (2, 3)])  ->  {0: [1, 2], 1: [0], 2: [0, 3], 3: [2]}
    adjacency(2, [])  ->  {0: [], 1: []}
    adjacency(3, [(0, 1), (1, 2), (0, 2)])  ->  {0: [1, 2], 1: [0, 2], 2: [0, 1]}

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ n ≤ 10^5
- 0 ≤ len(edges) ≤ 10^5

Target complexity: O(V + E log E)

Check your work:   python dsa.py test g-adj
Stuck?             python dsa.py hint g-adj
"""


def adjacency(n, edges):
    pass
