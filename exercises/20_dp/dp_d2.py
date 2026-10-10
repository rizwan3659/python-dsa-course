"""dp-d2 · LCS shifted by one
Topic 20: Dynamic Programming · medium · Memoization / DP · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    lcs("abcde", "ace")  ->  3
    lcs("abc", "abc")  ->  3
    lcs("abc", "def")  ->  0

Check your work:   python dsa.py test dp-d2
Stuck?             python dsa.py hint dp-d2
"""


def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i] == b[j]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]
