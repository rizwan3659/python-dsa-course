"""Reference solution · arr-find-min · Find Minimum

Complexity: O(n) time, O(1) space

Approach: Guard clause for empty input, then a running minimum.
"""


def find_min(nums):
    if not nums:
        return None
    best = nums[0]
    for n in nums:
        if n < best:
            best = n
    return best
