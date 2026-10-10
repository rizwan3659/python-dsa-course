"""Reference solution · bs-d4 · Binary search on unsorted data
"""


def contains(nums, target):
    import bisect
    nums = sorted(nums)
    i = bisect.bisect_left(nums, target)
    return i < len(nums) and nums[i] == target
