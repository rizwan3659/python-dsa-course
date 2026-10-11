"""rec-sum-digits · Sum of Digits
Topic 10: Recursion & Backtracking · easy · Recursion

`sum_digits(n)` returns the sum of the digits of a non-negative integer,
recursively.

`sum_digits(4096)` → `19`

Examples:
    sum_digits(4096)  ->  19
    sum_digits(0)  ->  0
    sum_digits(7)  ->  7

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ n ≤ 10^18

Target complexity: O(number of digits)

Check your work:   python dsa.py test rec-sum-digits
Stuck?             python dsa.py hint rec-sum-digits
"""


def sum_digits(n):
    # base case?
    # recursive case: last digit is n % 10, the rest is n // 10
    pass
