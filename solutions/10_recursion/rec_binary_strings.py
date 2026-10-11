"""Reference solution · rec-binary-strings · All Binary Strings

Complexity: O(n · 2ⁿ)

Approach: Build from the strings of length n − 1.

Common mistakes:
- Returning [] for n = 0 (the answer is [""]).
- Generating out of order (try "0" before "1").

Follow-up challenge: Only strings with no two adjacent 1s.
"""


def binary_strings(n):
    if n == 0:
        return [""]
    shorter = binary_strings(n - 1)
    return ["0" + s for s in shorter] + ["1" + s for s in shorter]
