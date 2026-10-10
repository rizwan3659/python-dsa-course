"""Reference solution · arr-reverse · Reverse Array

Complexity: O(n) time, O(1) space

Approach: Two pointers from both ends, swapping as they move inward.
"""


def reverse(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
