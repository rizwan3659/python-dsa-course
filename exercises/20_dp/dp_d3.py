"""dp-d3 · The item that was packed three times
Topic 20: Dynamic Programming · hard · Memoization / DP · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    knapsack([10], [1], 3)  ->  10
    knapsack([60, 100, 120], [10, 20, 30], 50)  ->  220
    knapsack([1, 4, 5, 7], [1, 3, 4, 5], 7)  ->  9

Check your work:   python dsa.py test dp-d3
Stuck?             python dsa.py hint dp-d3
"""


def knapsack(values, weights, capacity):
    dp = [0] * (capacity + 1)
    for v, w in zip(values, weights):
        for cap in range(w, capacity + 1):
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[capacity]
