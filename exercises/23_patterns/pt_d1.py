"""pt-d1 · Merging unsorted intervals
Topic 23: Problem-Solving Patterns · medium · Intervals · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    merge([[8, 10], [1, 9]])  ->  [[1, 10]]

Check your work:   python dsa.py test pt-d1
Stuck?             python dsa.py hint pt-d1
"""


def merge(intervals):
    merged = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
