"""th-d2 · Average of nothing
Topic 3: Algorithmic Thinking · easy · Brute Force · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    average([2, 4])  ->  3.0
    average([])  ->  0.0
    average([5])  ->  5.0

Check your work:   python dsa.py test th-d2
Stuck?             python dsa.py hint th-d2
"""


def average(nums):
    return sum(nums) / len(nums)
