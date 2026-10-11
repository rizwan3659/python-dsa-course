"""Reference solution · st-longest-pal · Longest Palindromic Substring

Complexity: O(n²) time, O(1) space

Approach: Expand around centres.

Common mistakes:
- Only expanding around single characters, missing even-length palindromes.
- Checking every substring: O(n³).

Follow-up challenge: Solve it in O(n) with Manacher's algorithm.
"""


def longest_palindrome(s):
    best = ""
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1:r]
    for i in range(len(s)):
        for cand in (expand(i, i), expand(i, i + 1)):   # odd and even centres
            if len(cand) > len(best):
                best = cand
    return best
