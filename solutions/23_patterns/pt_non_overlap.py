"""Reference solution · pt-non-overlap · Non-overlapping Intervals

Complexity: O(n log n)

Approach: Greedy by earliest end (activity selection).

Common mistakes:
- Sorting by start and removing greedily (can remove too many).
- Treating touching intervals as overlapping.

Follow-up challenge: Return the intervals to remove.
"""


def erase_overlap(intervals):
    removed, last_end = 0, float("-inf")
    for start, end in sorted(intervals, key=lambda iv: iv[1]):   # earliest end first
        if start >= last_end:
            last_end = end            # keep it
        else:
            removed += 1              # overlaps a kept interval: drop it
    return removed
