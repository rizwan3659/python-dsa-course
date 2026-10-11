"""Reference solution · rec-sum-digits · Sum of Digits

Complexity: O(number of digits)

Approach: Peel off the last digit each call.

Common mistakes:
- A base case of n < 10 that returns 0 instead of n.
- Using n / 10, which produces floats.

Follow-up challenge: Keep summing until a single digit remains.
"""


def sum_digits(n):
    if n < 10:
        return n
    return n % 10 + sum_digits(n // 10)
