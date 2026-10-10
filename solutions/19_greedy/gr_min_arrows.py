"""Reference solution · gr-min-arrows · Minimum Arrows to Burst Balloons

Complexity: O(n log n) time

Approach: Like activity selection: sort by end, place an arrow at each
group’s first end.

Common mistakes:
- Using >= instead of >: touching balloons share an arrow.
- Sorting by start without tracking the minimum end.

Follow-up challenge: How is this related to "minimum number of intervals to
remove so the rest do not overlap"?
"""


def min_arrows(points):
    arrows, last = 0, float("-inf")
    for start, end in sorted(points, key=lambda p: p[1]):
        if start > last:        # not burst by the last arrow
            arrows += 1
            last = end          # shoot as far right as possible
    return arrows
