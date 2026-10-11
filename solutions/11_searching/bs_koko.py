"""Reference solution · bs-koko · Koko Eating Bananas

Complexity: O(n log M)

Approach: Binary search on the answer with an O(n) feasibility check.

Common mistakes:
- Using hours += pile // k, which drops the partial hour.
- Searching speeds up to sum(piles) instead of max(piles).

Follow-up challenge: Each pile also has an earliest start time.
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
