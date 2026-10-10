"""Reference solution · th-d2 · Average of nothing
"""


def average(nums):
    if not nums:
        return 0.0
    return sum(nums) / len(nums)
