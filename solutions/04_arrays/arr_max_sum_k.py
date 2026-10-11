"""Reference solution · arr-max-sum-k · Maximum Sum of k in a Row

Complexity: O(n) time, O(1) space

Approach: Fixed-size sliding window: one add and one subtract per step.

Common mistakes:
- Recomputing each window with sum(): O(n · k).
- Starting best at 0 when every sum can be negative.

Follow-up challenge: Return the start index of the best window too.
"""


def max_sum_k(nums, k):
    window = sum(nums[:k])
    best = window
    for right in range(k, len(nums)):
        window += nums[right] - nums[right - k]
        best = max(best, window)
    return best
