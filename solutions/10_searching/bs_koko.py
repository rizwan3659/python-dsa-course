"""Reference solution · bs-koko · Koko Eating Bananas

Complexity: O(n log M)

Approach: Binary search on the answer with an O(n) feasibility check.
"""


def min_eating_speed(piles, h):
    lo, hi = 1, max(piles)
    while lo < hi:
        k = (lo + hi) // 2
        hours = sum((p + k - 1) // k for p in piles)   # ceil(p / k)
        if hours <= h:
            hi = k
        else:
            lo = k + 1
    return lo
