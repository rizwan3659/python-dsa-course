"""Reference solution · arr-d3 · One step too far
"""


def contains(nums, target):
    for x in nums:
        if x == target:
            return True
    return False
