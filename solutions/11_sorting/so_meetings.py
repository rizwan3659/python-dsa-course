"""Reference solution · so-meetings · Can Attend All Meetings

Complexity: O(n log n)

Approach: Sort by start; compare each start with the previous end.
"""


def can_attend(intervals):
    intervals = sorted(intervals)
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True
