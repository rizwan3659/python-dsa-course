"""Reference solution · dp-lcs · Longest Common Subsequence

Complexity: O(n · m) time and space

Approach: 2D DP over prefixes with an extra row and column for empty
prefixes.

Dry run:
          ""  a  c  e
     ""    0  0  0  0
     a     0  1  1  1
     b     0  1  1  1
     c     0  1  2  2
     d     0  1  2  2
     e     0  1  2  3

Common mistakes:
- Comparing a[i] with b[j] instead of a[i − 1] with b[j − 1].
- Confusing subsequence with substring (contiguous).

Follow-up challenge: Reconstruct one LCS string by walking back through the
table.
"""


def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]   # dp[i][j] = LCS of a[:i] and b[:j]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]
