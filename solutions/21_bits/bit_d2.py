"""Reference solution · bit-d2 · Testing the wrong bit
"""


def is_set(n, i):
    return (n >> i) & 1 == 1
