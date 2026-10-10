"""Reference solution · dp-knapsack · 0/1 Knapsack

Complexity: O(n · capacity) time, O(capacity) space

Approach: Classic 0/1 knapsack DP over capacities.

Dry run:
    values [1, 4, 5, 7], weights [1, 3, 4, 5], capacity 7
    best: weights 3 + 4 = 7, values 4 + 5 = 9

Common mistakes:
- Looping capacity upwards with a 1D table (items get reused).
- Using greedy by value/weight ratio, which is wrong for 0/1.

Follow-up challenge: Return which items to take. (Keep the 2D table, then
walk back.)
"""


def knapsack(values, weights, capacity):
    dp = [0] * (capacity + 1)          # dp[c] = best value with capacity c
    for v, w in zip(values, weights):
        for c in range(capacity, w - 1, -1):    # downwards: each item at most once
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[capacity]
