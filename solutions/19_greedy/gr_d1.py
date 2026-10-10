"""Reference solution · gr-d1 · Sorted by the wrong end
"""


def max_activities(intervals):
    intervals.sort(key=lambda x: x[1])
    count, last_end = 0, float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count
