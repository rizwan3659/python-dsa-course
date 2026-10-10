"""Reference solution · arr-longest-ones-k · Max Consecutive Ones with k Flips

Complexity: O(n) time

Approach: Variable window tracking the number of zeros inside.
"""


def longest_ones(nums, k):
    left = zeros = best = 0
    for right, x in enumerate(nums):
        if x == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        best = max(best, right - left + 1)
    return best
