"""Reference solution · pt-merge-intervals · Merge Intervals

Complexity: O(n log n)

Approach: Sort, then extend or start a new block.

Common mistakes:
- Not sorting by start first.
- Replacing the end instead of taking the max (an interval can contain
  another).

Follow-up challenge: Merge intervals arriving one by one (keep a sorted
structure).
"""


def merge(intervals):
    merged = []
    for start, end in sorted(intervals):
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
