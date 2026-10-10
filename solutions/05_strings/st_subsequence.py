"""Reference solution · st-subsequence · Is Subsequence

Complexity: O(len(t))

Approach: Two pointers (greedy matching).
"""


def is_subsequence(s, t):
    i = 0
    for ch in t:
        if i < len(s) and s[i] == ch:
            i += 1
    return i == len(s)
