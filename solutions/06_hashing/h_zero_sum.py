"""Reference solution · h-zero-sum · Zero-Sum Subarray Exists

Complexity: O(n) time

Approach: Prefix sums + set: a repeated prefix sum means a zero-sum stretch.

Common mistakes:
- Forgetting that a prefix sum of 0 itself means a zero-sum subarray from
  the start.
- Checking all subarrays: O(n²).

Follow-up challenge: Count all zero-sum subarrays.
"""


def has_zero_sum(nums):
    seen = {0}
    total = 0
    for x in nums:
        total += x
        if total in seen:
            return True
        seen.add(total)
    return False
