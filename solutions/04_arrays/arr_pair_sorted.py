"""Reference solution · arr-pair-sorted · Optimize: Pair Sum in a Sorted List

Complexity: O(n) time, O(1) space

Approach: Opposite-direction two pointers on the sorted list.

Common mistakes:
- Using the same position twice (left == right).
- Moving both pointers at once.

Follow-up challenge: Count all pairs with the target sum.
"""


def has_pair_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return True
        if total < target:
            left += 1
        else:
            right -= 1
    return False
