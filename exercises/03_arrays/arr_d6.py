"""arr-d6 · Second largest with duplicates
Topic 3: Arrays / Python Lists · easy · Sorting · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    second_largest([5, 5, 3])  ->  3
    second_largest([1, 2])  ->  1
    second_largest([4, 4])  ->  None

Check your work:   python dsa.py test arr-d6
Stuck?             python dsa.py hint arr-d6
"""


def second_largest(nums):
    nums = sorted(nums)
    return nums[-2]
