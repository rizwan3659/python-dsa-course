"""Reference solution · so-meetings · Can Attend All Meetings

Complexity: O(n log n)

Approach: Sort by start; compare each start with the previous end.

Common mistakes:
- Not sorting first.
- Using >= when comparing, which flags back-to-back meetings.

Follow-up challenge: Return the minimum number of rooms (hp-meeting-rooms).
"""


def can_attend(intervals):
    intervals = sorted(intervals)
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True
