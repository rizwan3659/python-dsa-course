"""Reference solution · bs-ship · Capacity to Ship Within D Days

Complexity: O(n log(sum))

Approach: Binary search on capacity + greedy check.

Common mistakes:
- Starting the search below max(weights) (one package must fit).
- Counting days incorrectly when a package starts a new day.

Follow-up challenge: Return the split of packages per day, too.
"""


def ship_within_days(weights, days):
    def days_needed(cap):
        d, load = 1, 0
        for w in weights:
            if load + w > cap:
                d += 1
                load = 0
            load += w
        return d
    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if days_needed(mid) <= days:
            hi = mid
        else:
            lo = mid + 1
    return lo
