"""r-d4 · The problem never shrinks
Topic 10: Recursion & Backtracking · easy · Recursion · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    count(5)  ->  5

Check your work:   python dsa.py test r-d4
Stuck?             python dsa.py hint r-d4
"""


def count(n):
    if n == 0:
        return 0
    return 1 + count(n)
