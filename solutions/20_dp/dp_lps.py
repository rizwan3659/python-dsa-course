"""Reference solution · dp-lps · Longest Palindromic Subsequence

Complexity: O(n²) time and space

Approach: Interval DP filled from short substrings to long ones (or: LCS of
s and reversed s).

Common mistakes:
- Filling i from 0 upwards, which reads dp[i + 1][…] before it is computed.
- Confusing it with the longest palindromic substring (contiguous).

Follow-up challenge: Show that the answer equals lcs(s, s[::-1]), and find
the minimum insertions to make s a palindrome.
"""


def longest_pal_subseq(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]       # dp[i][j] = answer for s[i..j]
    for i in range(n - 1, -1, -1):         # shorter intervals first
        dp[i][i] = 1
        for j in range(i + 1, n):
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j - 1] + 2
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
    return dp[0][n - 1]
