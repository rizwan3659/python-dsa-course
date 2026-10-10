"""Reference solution · dp-coin-ways · Coin Change II (number of ways)

Complexity: O(amount · k) time, O(amount) space

Approach: Unbounded knapsack counting: add dp[a − c] for each coin c, with
coins in the outer loop.

Common mistakes:
- Swapping the loops, which counts 1 + 2 and 2 + 1 separately.
- dp[0] = 0, which makes every answer 0.

Follow-up challenge: Count ordered sequences instead (that is "Combination
Sum IV"). Which loop order do you need?
"""


def coin_ways(amount, coins):
    dp = [1] + [0] * amount            # one way to make 0: no coins
    for c in coins:                    # coins outside: each combination counted once
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]
