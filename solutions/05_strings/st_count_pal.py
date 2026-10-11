"""Reference solution · st-count-pal · Count Palindromic Substrings

Complexity: O(n²)

Approach: Expand around centres.

Common mistakes:
- Counting distinct palindromes instead of positions.
- Forgetting even-length centres between two characters.

Follow-up challenge: Count only the palindromic substrings of length ≥ 3.
"""


def count_substrings(s):
    count = 0
    for center in range(2 * len(s) - 1):
        l, r = center // 2, center // 2 + center % 2
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1
    return count
