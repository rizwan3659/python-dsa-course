"""Reference solution · arr-find-min · Find Minimum

Complexity: O(n) time, O(1) space

Approach: Guard clause for empty input, then a running minimum.

Common mistakes:
- Crashing on an empty list instead of returning None.
- Starting the minimum at 0 or a "large" constant that might be too small.

Follow-up challenge: Find the minimum and the maximum in one pass with about
1.5n comparisons.
"""


def find_min(nums):
    if not nums:
        return None
    best = nums[0]
    for n in nums:
        if n < best:
            best = n
    return best
