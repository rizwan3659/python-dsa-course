"""r-d2 · The answer disappears
Topic 10: Recursion & Backtracking · easy · Recursion · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    total([1, 2, 3])  ->  6
    total([])  ->  0

Check your work:   python dsa.py test r-d2
Stuck?             python dsa.py hint r-d2
"""


def total(nums):
    if not nums:
        return 0
    nums[0] + total(nums[1:])
