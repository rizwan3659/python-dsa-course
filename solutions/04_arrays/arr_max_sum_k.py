"""Reference solution · arr-max-sum-k · Maximum Sum of k in a Row

Complexity: O(n) time, O(1) space

Approach: Fixed-size sliding window: one add and one subtract per step.
"""


def max_sum_k(nums, k):
    window = sum(nums[:k])
    best = window
    for right in range(k, len(nums)):
        window += nums[right] - nums[right - k]
        best = max(best, window)
    return best
