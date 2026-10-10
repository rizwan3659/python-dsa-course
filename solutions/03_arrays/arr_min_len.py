"""Reference solution · arr-min-len · Minimum Size Subarray Sum

Complexity: O(n) time, O(1) space

Approach: Variable-size sliding window: expand right, shrink left while
valid.
"""


def min_subarray_len(target, nums):
    left = total = 0
    best = float("inf")
    for right in range(len(nums)):
        total += nums[right]
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if best == float("inf") else best
