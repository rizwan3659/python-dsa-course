"""Reference solution · st-regex · Regular Expression Matching

Complexity: O(len(s) · len(p)) time and space

Approach: Top-down DP over (i, j) with the two choices for a starred
character.

Dry run:
    is_match("aab", "c*a*b")
    c* used 0 times → a* used twice → b matches b → end of both → True

Common mistakes:
- Treating * as "any characters" (that is wildcard matching, a different
  problem).
- Recursion without memoization: exponential on patterns like a*a*a*…
- Forgetting that the pattern must match the whole string, not a prefix.

Follow-up challenge: Write the bottom-up table version, then support "+"
(one or more).
"""


from functools import lru_cache


def is_match(s, p):
    @lru_cache(maxsize=None)
    def match(i, j):                       # does s[i:] match p[j:]?
        if j == len(p):
            return i == len(s)
        first = i < len(s) and p[j] in (s[i], ".")
        if j + 1 < len(p) and p[j + 1] == "*":
            # skip "x*" entirely, or use it for one character and stay on it
            return match(i, j + 2) or (first and match(i + 1, j))
        return first and match(i + 1, j + 1)

    return match(0, 0)
