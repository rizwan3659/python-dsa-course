"""Reference solution · bs-first-bad · First Bad Version

Complexity: O(log n) calls

Approach: Binary search for the boundary.

Common mistakes:
- Checking every version from 1: far too slow.
- Setting hi = mid − 1 when mid is bad (it might be the first bad one).

Follow-up challenge: Count how many calls to is_bad you made, and compare
with log₂ n.
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
