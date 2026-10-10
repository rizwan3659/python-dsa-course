"""Reference solution · ag-k-stops · Cheapest Flights Within K Stops

Complexity: O(k · E)

Approach: Bellman-Ford with k + 1 rounds.
"""


def find_cheapest_price(n, flights, src, dst, k):
    cost = [float("inf")] * n
    cost[src] = 0
    for _ in range(k + 1):                 # at most k + 1 flights
        new = cost[:]                      # use last round's costs only
        for u, v, p in flights:
            if cost[u] + p < new[v]:
                new[v] = cost[u] + p
        cost = new
    return -1 if cost[dst] == float("inf") else cost[dst]
