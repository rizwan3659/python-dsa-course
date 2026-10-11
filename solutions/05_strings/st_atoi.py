"""Reference solution · st-atoi · String to Integer

Complexity: O(n)

Approach: Careful left-to-right simulation.

Common mistakes:
- Accepting a sign after spaces in the middle of digits.
- Forgetting to clamp to the 32-bit range.

Follow-up challenge: Also parse an optional decimal part and return a float.
"""


def my_atoi(s):
    i, n = 0, len(s)
    while i < n and s[i] == " ":
        i += 1
    sign = 1
    if i < n and s[i] in "+-":
        sign = -1 if s[i] == "-" else 1
        i += 1
    num = 0
    while i < n and s[i].isdigit():
        num = num * 10 + int(s[i])
        i += 1
    num *= sign
    return max(-2 ** 31, min(2 ** 31 - 1, num))
