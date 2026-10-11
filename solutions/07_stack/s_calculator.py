"""Reference solution · s-calculator · Basic Calculator

Complexity: O(n) time, O(depth) space

Approach: One pass with a running total, a current sign, and a stack of
saved (total, sign) pairs for parentheses.

Dry run:
    "10 - (2 - (3 - 4))"
    read 10, see "-":   total 10, sign -1;  "(" pushes (10, -1)
    read 2,  see "-":   total 2,  sign -1;  "(" pushes (2, -1)
    inner 3 - 4 = -1;   ")" pops (2, -1):  2 + (-1)(-1) = 3
    ")" pops (10, -1):  10 + (-1)(3) = 7

Common mistakes:
- Reading only one-digit numbers.
- Forgetting to add the last number after the loop.
- Applying the sign before a "(" to only the first number inside it.

Follow-up challenge: Add * and / with the usual precedence (Basic Calculator
II), then both features together.
"""


def calculate(s):
    total, number, sign = 0, 0, 1
    stack = []                                  # saved (total, sign) before each "("
    for ch in s:
        if ch.isdigit():
            number = number * 10 + int(ch)
        elif ch in "+-":
            total += sign * number
            number, sign = 0, (1 if ch == "+" else -1)
        elif ch == "(":
            stack.append((total, sign))
            total, sign = 0, 1
        elif ch == ")":
            total += sign * number
            number = 0
            outer_total, outer_sign = stack.pop()
            total = outer_total + outer_sign * total
    return total + sign * number
