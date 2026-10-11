"""Reference solution · arr-max-subarray · Maximum Subarray

Complexity: O(n) time, O(1) space

Approach: Kadane's algorithm: cur = max(x, cur + x), best = max(best, cur).

Common mistakes:
- Starting best at 0: wrong when all numbers are negative.
- Resetting the running sum to 0 before comparing with best.

Follow-up challenge: Return the start and end indexes of the best subarray.
"""


def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best
