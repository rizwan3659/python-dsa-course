"""Reference solution · arr-min-len · Minimum Size Subarray Sum

Complexity: O(n) time, O(1) space

Approach: Variable-size sliding window: expand right, shrink left while
valid.

Common mistakes:
- Not shrinking the window as far as possible.
- Returning n + 1 or infinity instead of 0 when no window works.

Follow-up challenge: What changes if numbers can be negative?
(pt-shortest-subarray-k)
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
