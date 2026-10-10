"""Reference solution · gr-fractional · Fractional Knapsack

Complexity: O(n log n) time

Approach: Sort by value / weight descending and fill the bag greedily.

Common mistakes:
- Sorting by value or by weight instead of by ratio.
- Using integer division and losing the fractional part.

Follow-up challenge: Show with a small example why this greedy is wrong for
0/1 knapsack, then solve 0/1 knapsack with DP (topic 20).
"""


def fractional_knapsack(items, capacity):
    total = 0.0
    for value, weight in sorted(items, key=lambda it: it[0] / it[1], reverse=True):
        if capacity == 0:
            break
        take = min(weight, capacity)          # all of it, or what still fits
        total += value * take / weight
        capacity -= take
    return total
