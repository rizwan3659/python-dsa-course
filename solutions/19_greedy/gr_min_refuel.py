"""Reference solution · gr-min-refuel · Minimum Refueling Stops

Complexity: O(n log n) time, O(n) space

Approach: Greedy with a max-heap of passed stations ("refuel
retroactively").

Common mistakes:
- Stopping at every station you reach (not minimal).
- A DP over stations and stops works (O(n²)), but misses the greedy insight.

Follow-up challenge: Solve it with DP: dp[s] = furthest reachable with s
stops. Compare with the greedy.
"""


import heapq


def min_refuel_stops(target, start_fuel, stations):
    passed = []                         # max-heap (negated) of fuel at stations we drove past
    fuel, stops, i = start_fuel, 0, 0
    while fuel < target:                # fuel = furthest position we can reach
        while i < len(stations) and stations[i][0] <= fuel:
            heapq.heappush(passed, -stations[i][1])
            i += 1
        if not passed:
            return -1
        fuel -= heapq.heappop(passed)   # "we stopped there after all": take the biggest
        stops += 1
    return stops
