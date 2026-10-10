"""pt-d2 · Greedy by the wrong key
Topic 18: Problem-Solving Patterns · medium · Greedy · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    max_meetings([[1, 10], [2, 3], [4, 5]])  ->  2

Check your work:   python dsa.py test pt-d2
Stuck?             python dsa.py hint pt-d2
"""


def max_meetings(intervals):        # how many non-overlapping meetings fit?
    count, last_end = 0, float("-inf")
    for start, end in sorted(intervals):   # sorted by START
        if start >= last_end:
            count += 1
            last_end = end
    return count
