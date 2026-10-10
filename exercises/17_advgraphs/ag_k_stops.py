"""ag-k-stops · Cheapest Flights Within K Stops
Topic 17: Advanced Graphs · hard · Shortest Path

Flights `(u, v, price)`. Return the cheapest price from src to dst with at
most k stops, or -1.

Examples:
    find_cheapest_price(4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1)  ->  700
    find_cheapest_price(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1)  ->  200
    find_cheapest_price(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0)  ->  500

Target complexity: O(k · E)

Check your work:   python dsa.py test ag-k-stops
Stuck?             python dsa.py hint ag-k-stops
"""


def find_cheapest_price(n, flights, src, dst, k):
    pass
