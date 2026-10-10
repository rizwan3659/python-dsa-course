"""Reference solution · arr-d5 · Reversed copy crashes
"""


def reverse_copy(nums):
    result = []
    for i in range(len(nums)):
        result.append(nums[len(nums) - 1 - i])
    return result
