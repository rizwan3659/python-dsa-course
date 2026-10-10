"""Reference solution · r-d1 · factorial(0) never ends
"""


def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
