"""Reference solution · rec-sum-digits · Sum of Digits

Complexity: O(number of digits)

Approach: Peel off the last digit each call.
"""


def sum_digits(n):
    if n < 10:
        return n
    return n % 10 + sum_digits(n // 10)
