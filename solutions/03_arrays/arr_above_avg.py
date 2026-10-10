"""Reference solution · arr-above-avg · Count Above Average

Complexity: O(n) time

Approach: Compute the average once, then count.
"""


def count_above_average(nums):
    if not nums:
        return 0
    avg = sum(nums) / len(nums)
    return sum(1 for x in nums if x > avg)
