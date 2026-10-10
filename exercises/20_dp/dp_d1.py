"""dp-d1 · Zero coins for everything
Topic 20: Dynamic Programming · easy · Memoization / DP · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    coin_change([1, 2, 5], 11)  ->  3
    coin_change([2], 3)  ->  -1
    coin_change([1], 0)  ->  0

Check your work:   python dsa.py test dp-d1
Stuck?             python dsa.py hint dp-d1
"""


def coin_change(coins, amount):
    dp = [0] * (amount + 1)
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1
