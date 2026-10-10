"""Reference solution · r-d2 · The answer disappears
"""


def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])
