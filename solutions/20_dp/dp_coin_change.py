"""Reference solution · dp-coin-change · Coin Change (fewest coins)

Complexity: O(amount · k) time, O(amount) space

Approach: Unbounded DP over amounts 0..amount.

Dry run:
    coins [1, 3, 4], amount 6
    a:   0 1 2 3 4 5 6
    dp:  0 1 2 1 1 2 2

Common mistakes:
- Starting dp at 0 instead of infinity.
- Returning infinity instead of −1.
- Using greedy.

Follow-up challenge: Also return which coins to use (store the last coin
chosen for each amount).
"""


def coin_change(coins, amount):
    INF = float("inf")
    dp = [0] + [INF] * amount          # dp[a] = fewest coins for amount a
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a and dp[a - c] + 1 < dp[a]:
                dp[a] = dp[a - c] + 1
    return dp[amount] if dp[amount] != INF else -1
