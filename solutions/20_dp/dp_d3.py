"""Reference solution · dp-d3 · The item that was packed three times
"""


def knapsack(values, weights, capacity):
    dp = [0] * (capacity + 1)
    for v, w in zip(values, weights):
        for cap in range(capacity, w - 1, -1):
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[capacity]
