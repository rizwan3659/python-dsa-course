"""Reference solution · pt-gas-station · Gas Station

Complexity: O(n)

Approach: One-pass greedy restart.
"""


def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1
    start = tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:                 # cannot get past i from start: try i + 1
            start = i + 1
            tank = 0
    return start
