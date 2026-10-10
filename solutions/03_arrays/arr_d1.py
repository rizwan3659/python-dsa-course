"""Reference solution · arr-d1 · The total that is not a total
"""


def total(nums):
    result = 0
    for n in nums:
        result += n
    return result
