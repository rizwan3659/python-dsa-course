"""Reference solution · th-gcd · Greatest Common Divisor

Complexity: O(log min(a, b)) time, O(1) space

Approach: Euclid's algorithm: replace (a, b) with (b, a % b) until b is 0.

Dry run:
    gcd(48, 18) → (18, 12) → (12, 6) → (6, 0) → 6

Common mistakes:
- Subtracting instead of using %: correct but can take billions of steps.
- Returning b instead of a at the end.

Follow-up challenge: Write lcm(a, b) using gcd. Why compute a // gcd(a, b) *
b instead of a * b // gcd(a, b)?
"""


def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
