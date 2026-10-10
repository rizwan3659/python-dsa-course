"""Reference solution · gr-make-change · Make Change (canonical coins)

Complexity: O(k log k + number of coins used) time

Approach: Largest coin first, as many times as it fits. Only correct because
the coin system is canonical.

Common mistakes:
- Forgetting to sort coins that arrive in a random order.
- Believing this works for any coins: [1, 3, 4] with amount 6 breaks it.

Follow-up challenge: Write a brute force that finds the true minimum for
small amounts and use it to find the smallest amount where greedy fails for
coins [1, 3, 4].
"""


def make_change(amount, coins):
    used = []
    for c in sorted(coins, reverse=True):
        while amount >= c:
            amount -= c
            used.append(c)
    return used
