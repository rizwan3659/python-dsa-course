"""Reference solution · arr-monotonic · Monotonic Array

Complexity: O(n) time

Approach: Compare neighbours once, keeping two flags.
"""


def is_monotonic(nums):
    up = down = True
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            up = False
        if nums[i] > nums[i - 1]:
            down = False
    return up or down
