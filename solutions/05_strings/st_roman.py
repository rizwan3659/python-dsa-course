"""Reference solution · st-roman · Roman to Integer

Complexity: O(n)

Approach: Dict of values + look-ahead.

Common mistakes:
- Always adding, so IV becomes 6.
- Comparing a symbol with the previous one instead of the next one.

Follow-up challenge: Write the reverse: integer to Roman numeral.
"""


def roman_to_int(s):
    val = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
    total = 0
    for i, ch in enumerate(s):
        if i + 1 < len(s) and val[ch] < val[s[i + 1]]:
            total -= val[ch]
        else:
            total += val[ch]
    return total
