"""Reference solution · bit-d3 · The missing number goes missing
"""


def missing_number(nums):
    result = len(nums)
    for i in range(len(nums)):
        result ^= i ^ nums[i]
    return result
