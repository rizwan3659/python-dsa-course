"""Reference solution · arr-reverse · Reverse Array

Complexity: O(n) time, O(1) space

Approach: Two pointers from both ends, swapping as they move inward.

Common mistakes:
- Looping to the end instead of the middle, which reverses everything twice.
- Building a new list instead of changing nums.

Follow-up challenge: Reverse only the part between indexes l and r.
"""


def reverse(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
