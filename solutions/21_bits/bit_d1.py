"""Reference solution · bit-d1 · Zero is not a power of two
"""


def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0
