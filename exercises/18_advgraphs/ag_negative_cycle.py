"""ag-negative-cycle · Detect a Negative Cycle
Topic 18: Advanced Graphs · medium · Shortest Path

Nodes are 0..n − 1 and edges are directed `(u, v, w)`. Return `True` if the
graph contains any cycle with negative total weight (anywhere, not only
reachable from node 0).

Examples:
    has_negative_cycle(3, [(0, 1, 1), (1, 2, -1), (2, 0, -1)])  ->  True
    has_negative_cycle(3, [(0, 1, 1), (1, 2, -1), (2, 0, 1)])  ->  False
    has_negative_cycle(1, [])  ->  False

(3 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ n ≤ 500
- 0 ≤ len(edges) ≤ 5000, −1000 ≤ w ≤ 1000

Before this: ag-bf-m2

Target complexity: O(V · E) time, O(V) space

Check your work:   python dsa.py test ag-negative-cycle
Stuck?             python dsa.py hint ag-negative-cycle
"""


def has_negative_cycle(n, edges):
    # your code here
    pass
