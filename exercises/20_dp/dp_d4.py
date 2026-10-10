"""dp-d4 · A robber with the wrong start
Topic 20: Dynamic Programming · easy · Memoization / DP · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    rob([2, 1, 1, 2])  ->  4
    rob([5, 1])  ->  5
    rob([1, 2, 3, 1])  ->  4

Check your work:   python dsa.py test dp-d4
Stuck?             python dsa.py hint dp-d4
"""


def rob(nums):
    if not nums:
        return 0
    dp = [0] * len(nums)
    dp[0] = nums[0]
    if len(nums) > 1:
        dp[1] = nums[1]
    for i in range(2, len(nums)):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    return dp[-1]
