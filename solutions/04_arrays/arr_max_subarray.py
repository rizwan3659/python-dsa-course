"""Reference solution · arr-max-subarray · Maximum Subarray

Complexity: O(n) time, O(1) space

Approach: Kadane's algorithm: cur = max(x, cur + x), best = max(best, cur).
"""


def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best
