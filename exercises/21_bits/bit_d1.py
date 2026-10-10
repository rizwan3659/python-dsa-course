"""bit-d1 · Zero is not a power of two
Topic 21: Bit Manipulation · easy · Bit Manipulation · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    is_power_of_two(4)  ->  True
    is_power_of_two(6)  ->  False
    is_power_of_two(0)  ->  False
    is_power_of_two(1)  ->  True

Check your work:   python dsa.py test bit-d1
Stuck?             python dsa.py hint bit-d1
"""


def is_power_of_two(n):
    return (n & (n - 1)) == 0
