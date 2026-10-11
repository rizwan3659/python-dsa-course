"""Reference solution · pt-stock-ii · Best Time to Buy and Sell Stock II

Complexity: O(n)

Approach: Greedy: take every upward step.

Common mistakes:
- Looking for the single best buy/sell pair (that is a different problem).

Follow-up challenge: At most two transactions.
"""


def max_profit(prices):
    return sum(max(0, prices[i] - prices[i - 1]) for i in range(1, len(prices)))
