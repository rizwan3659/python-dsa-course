"""Reference solution · dp-lis · Longest Increasing Subsequence

Complexity: O(n²) time, O(n) space

Approach: O(n²) DP over end positions; the answer is the max over all ends.

Common mistakes:
- Returning best[-1]: the longest subsequence may end anywhere.
- Using <= and counting equal values (the sequence must be strictly
  increasing).

Follow-up challenge: Solve it in O(n log n) (dp-lis-fast).
"""


def lis(nums):
    best = [1] * len(nums)             # best[i] = LIS ending at index i
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                best[i] = max(best[i], best[j] + 1)
    return max(best, default=0)
