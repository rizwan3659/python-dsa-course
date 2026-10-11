"""Reference solution · st-subsequence · Is Subsequence

Complexity: O(len(t))

Approach: Two pointers (greedy matching).

Common mistakes:
- Using str.find without moving past the previous match.
- Checking that the characters exist but not their order.

Follow-up challenge: Answer many s queries against the same t quickly (index
lists + binary search).
"""


def is_subsequence(s, t):
    i = 0
    for ch in t:
        if i < len(s) and s[i] == ch:
            i += 1
    return i == len(s)
