"""Reference solution · dp-max-product · Maximum Product Subarray

Complexity: O(n) time, O(1) space

Approach: DP with two states per index: max and min product ending here.

Common mistakes:
- Tracking only the maximum (fails on [-2, 3, -4]).
- Updating hi before computing lo with the old hi.

Follow-up challenge: Return the subarray itself, not just its product.
"""


def max_product(nums):
    hi = lo = best = nums[0]          # largest and smallest product ending here
    for x in nums[1:]:
        candidates = (x, hi * x, lo * x)
        hi, lo = max(candidates), min(candidates)
        best = max(best, hi)
    return best
