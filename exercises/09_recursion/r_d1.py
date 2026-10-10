"""r-d1 · factorial(0) never ends
Topic 9: Recursion & Backtracking · easy · Recursion · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    factorial(0)  ->  1
    factorial(4)  ->  24

Check your work:   python dsa.py test r-d1
Stuck?             python dsa.py hint r-d1
"""


def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)
