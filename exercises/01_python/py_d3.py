"""py-d3 · Returns too early
Topic 1: Python for DSA · easy · Python basics · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    total([1, 2, 3])  ->  6
    total([])  ->  0

Check your work:   python dsa.py test py-d3
Stuck?             python dsa.py hint py-d3
"""


def total(nums):
    t = 0
    for n in nums:
        t += n
        return t
