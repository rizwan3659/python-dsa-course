"""ag-network-delay · Network Delay Time
Topic 18: Advanced Graphs · medium · Shortest Path

`times[i] = (u, v, w)`: a signal from u reaches v after w. Nodes are 1..n.
Starting at k, how long until every node has the signal? -1 if some never
do.

Examples:
    network_delay([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)  ->  2
    network_delay([[1, 2, 1]], 2, 1)  ->  1
    network_delay([[1, 2, 1]], 2, 2)  ->  -1

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ k ≤ n ≤ 100
- 1 ≤ len(times) ≤ 6000

Target complexity: O((V + E) log V)

Check your work:   python dsa.py test ag-network-delay
Stuck?             python dsa.py hint ag-network-delay
"""


import heapq

def network_delay(times, n, k):
    pass
