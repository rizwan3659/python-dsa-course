"""Reference solution · arr-stock · Best Time to Buy and Sell Stock

Complexity: O(n) time, O(1) space

Approach: One pass: remember the cheapest price so far, and the best “sell
today” profit.

Common mistakes:
- Selling before buying (using max − min of the whole list).
- Returning a negative profit instead of 0.

Follow-up challenge: You may buy and sell many times (pt-stock-ii).
"""


def max_profit(prices):
    lowest = float("inf")
    best = 0
    for p in prices:
        lowest = min(lowest, p)
        best = max(best, p - lowest)
    return best
