"""Reference solution · rec-factorial · Factorial

Complexity: O(n) time, O(n) stack

Approach: n × factorial(n − 1).
"""


def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
