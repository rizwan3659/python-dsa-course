"""Reference solution · rec-gcd · Greatest Common Divisor

Complexity: O(log min(a, b))

Approach: Euclid's algorithm.
"""


def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)
