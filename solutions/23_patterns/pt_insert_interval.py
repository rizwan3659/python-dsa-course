"""Reference solution · pt-insert-interval · Insert Interval

Complexity: O(n)

Approach: Linear three-phase scan.

Common mistakes:
- Sorting again (the input is already sorted).
- Not merging with several existing intervals.

Follow-up challenge: Remove an interval instead of inserting.
"""


def insert(intervals, new):
    out, i, n = [], 0, len(intervals)
    while i < n and intervals[i][1] < new[0]:      # entirely before
        out.append(intervals[i])
        i += 1
    start, end = new
    while i < n and intervals[i][0] <= end:         # overlapping
        start = min(start, intervals[i][0])
        end = max(end, intervals[i][1])
        i += 1
    out.append([start, end])
    out.extend(intervals[i:])                        # entirely after
    return out
