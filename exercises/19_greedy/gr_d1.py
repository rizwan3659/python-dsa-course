"""gr-d1 · Sorted by the wrong end
Topic 19: Greedy Algorithms · easy · Intervals · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    max_activities([[1, 10], [2, 3], [4, 5]])  ->  2
    max_activities([[1, 2], [3, 4]])  ->  2
    max_activities([])  ->  0

Check your work:   python dsa.py test gr-d1
Stuck?             python dsa.py hint gr-d1
"""


def max_activities(intervals):
    intervals.sort(key=lambda x: x[0])
    count, last_end = 0, float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count
