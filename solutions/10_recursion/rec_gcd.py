"""Reference solution · rec-gcd · Greatest Common Divisor

Complexity: O(log min(a, b))

Approach: Euclid's algorithm.

Common mistakes:
- Using subtraction instead of %, which takes very long for (10¹⁸, 1).
- Base case on a == 0 only.

Follow-up challenge: Compute the gcd of a whole list of numbers.
"""


def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)
