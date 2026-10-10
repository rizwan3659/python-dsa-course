"""Reference solution · arr-d8 · Rotate by more than the length
"""


def rotate(nums, k):
    if not nums:
        return nums
    k %= len(nums)
    return nums[-k:] + nums[:-k] if k else nums[:]
