"""Reference solution · pt-interval-intersection · Interval List Intersections

Complexity: O(n + m)

Approach: Two pointers over both lists.

Common mistakes:
- Advancing both pointers at once.
- Advancing the interval that ends later.

Follow-up challenge: Intersect k lists of intervals.
"""


def interval_intersection(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        lo = max(a[i][0], b[j][0])
        hi = min(a[i][1], b[j][1])
        if lo <= hi:
            out.append([lo, hi])
        if a[i][1] < b[j][1]:          # the one that ends first is done
            i += 1
        else:
            j += 1
    return out
