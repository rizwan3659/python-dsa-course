"""Reference solution · r-d4 · The problem never shrinks
"""


def count(n):
    if n == 0:
        return 0
    return 1 + count(n - 1)
