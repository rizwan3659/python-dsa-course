"""Reference solution · arr-plus-one · Plus One

Complexity: O(n) time

Approach: Right-to-left carry, prepend 1 if every digit was 9.

Common mistakes:
- Converting to int and back (works in Python, but misses the point of the
  exercise).
- Forgetting the extra leading 1 for all nines.

Follow-up challenge: Add two numbers stored as digit lists.
"""


def plus_one(digits):
    digits = digits[:]
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits
