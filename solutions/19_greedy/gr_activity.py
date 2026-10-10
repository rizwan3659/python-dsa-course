"""Reference solution · gr-activity · Activity Selection

Complexity: O(n log n) time, O(n) space for the sorted copy

Approach: Sort by end time and greedily take every compatible activity.

Dry run:
    sorted by end: [1,3] [2,4] [3,5] [0,6] [5,7] [8,9] [5,9]
    take [1,3] (last_end 3), skip [2,4], take [3,5] (5), skip [0,6],
    take [5,7] (7), take [8,9] (9), skip [5,9] → 4

Common mistakes:
- Sorting by start time or by length.
- Using start > last_end, which rejects back-to-back activities.

Follow-up challenge: Return the chosen activities themselves, not just how
many.
"""


def max_activities(intervals):
    count, last_end = 0, float("-inf")
    for start, end in sorted(intervals, key=lambda x: x[1]):   # earliest end first
        if start >= last_end:
            count += 1
            last_end = end
    return count
