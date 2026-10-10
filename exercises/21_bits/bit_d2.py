"""bit-d2 · Testing the wrong bit
Topic 21: Bit Manipulation · easy · Bit Manipulation · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    is_set(5, 2)  ->  True
    is_set(5, 1)  ->  False
    is_set(8, 3)  ->  True
    is_set(1, 0)  ->  True

Check your work:   python dsa.py test bit-d2
Stuck?             python dsa.py hint bit-d2
"""


def is_set(n, i):
    return n & i != 0
