"""Reference solution · st-atoi · String to Integer

Complexity: O(n)

Approach: Careful left-to-right simulation.
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
