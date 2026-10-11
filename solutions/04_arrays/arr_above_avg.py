"""Reference solution · arr-above-avg · Count Above Average

Complexity: O(n) time

Approach: Compute the average once, then count.

Common mistakes:
- Dividing by zero on an empty list.
- Using integer division for the average.

Follow-up challenge: Count how many are within 10% of the average.
"""


def count_above_average(nums):
    if not nums:
        return 0
    avg = sum(nums) / len(nums)
    return sum(1 for x in nums if x > avg)
