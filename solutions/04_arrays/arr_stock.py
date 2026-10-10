"""Reference solution · arr-stock · Best Time to Buy and Sell Stock

Complexity: O(n) time, O(1) space

Approach: One pass: remember the cheapest price so far, and the best “sell
today” profit.
"""


def max_profit(prices):
    lowest = float("inf")
    best = 0
    for p in prices:
        lowest = min(lowest, p)
        best = max(best, p - lowest)
    return best
