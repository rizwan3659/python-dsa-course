"""so-d3 · k-th largest, off by one
Topic 12: Sorting · easy · Sorting · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    kth_largest([3, 1, 2], 1)  ->  3
    kth_largest([3, 1, 2], 3)  ->  1

Check your work:   python dsa.py test so-d3
Stuck?             python dsa.py hint so-d3
"""


def kth_largest(nums, k):
    return sorted(nums, reverse=True)[k]
