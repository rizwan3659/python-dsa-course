"""Reference solution · dp-edit-distance · Edit Distance

Complexity: O(n · m) time and space

Approach: 2D DP over prefixes (Levenshtein distance).

Common mistakes:
- Forgetting the base row and column.
- Adding 1 even when the characters match.

Follow-up challenge: Use only two rows of the table: O(m) space.
"""


def edit_distance(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        dp[i][0] = i                   # delete everything
    for j in range(m + 1):
        dp[0][j] = j                   # insert everything
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j],      # delete a[i-1]
                                   dp[i][j - 1],      # insert b[j-1]
                                   dp[i - 1][j - 1])  # replace
    return dp[n][m]
