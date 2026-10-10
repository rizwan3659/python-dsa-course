"""Reference solution · pt-merge-intervals · Merge Intervals

Complexity: O(n log n)

Approach: Sort, then extend or start a new block.
"""


def merge(intervals):
    merged = []
    for start, end in sorted(intervals):
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
