"""Reference solution · th-digit-sum · Sum of Digits

Complexity: O(d) time where d is the number of digits (O(log n)), O(1) space

Approach: Peel digits off the end with % 10 and // 10 until nothing is left.

Dry run:
    n = 123: total 0 + 3 = 3, n = 12
             total 3 + 2 = 5, n = 1
             total 5 + 1 = 6, n = 0 → stop, return 6

Common mistakes:
- Writing `while n > 10` and losing the last digit.
- Using `/` instead of `//`, which turns n into a float.

Follow-up challenge: Repeat the digit sum until a single digit is left (the
"digital root"). Can you do it in O(1) with modulo 9?
"""


def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10   # last digit
        n //= 10          # drop the last digit
    return total
