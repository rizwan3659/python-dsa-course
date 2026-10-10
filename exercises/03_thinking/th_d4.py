"""th-d4 · The digit sum that stops early
Topic 3: Algorithmic Thinking · easy · Math · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    digit_sum(123)  ->  6
    digit_sum(10)  ->  1
    digit_sum(7)  ->  7
    digit_sum(0)  ->  0

Check your work:   python dsa.py test th-d4
Stuck?             python dsa.py hint th-d4
"""


def digit_sum(n):
    total = 0
    while n > 10:
        total += n % 10
        n //= 10
    return total
