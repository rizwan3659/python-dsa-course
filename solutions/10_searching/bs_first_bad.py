"""Reference solution · bs-first-bad · First Bad Version

Complexity: O(log n) calls

Approach: Binary search for the boundary.
"""


def first_bad(n, is_bad):
    lo, hi = 1, n
    while lo < hi:
        mid = (lo + hi) // 2
        if is_bad(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
