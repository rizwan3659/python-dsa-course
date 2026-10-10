"""Reference solution · gr-platforms · Minimum Train Platforms

Complexity: O(n log n) time, O(n) space

Approach: Sweep line over sorted arrivals and departures, tracking the
number of trains present.

Common mistakes:
- Using < instead of <= and sharing a platform at the exact same minute.
- Sorting the (arr, dep) pairs together and comparing neighbours only.

Follow-up challenge: Solve it with a min-heap of departure times (see
Meeting Rooms II, hp-meeting-rooms).
"""


def min_platforms(arr, dep):
    arr, dep = sorted(arr), sorted(dep)
    i = j = 0
    current = best = 0
    while i < len(arr):
        if arr[i] <= dep[j]:      # a train arrives before the earliest departure
            current += 1
            best = max(best, current)
            i += 1
        else:                      # a train leaves first
            current -= 1
            j += 1
    return best
