"""Reference solution · arr-longest-ones-k · Max Consecutive Ones with k Flips

Complexity: O(n) time

Approach: Variable window tracking the number of zeros inside.

Common mistakes:
- Restarting the window from scratch after too many zeros (O(n²)).
- Counting ones instead of zeros inside the window.

Follow-up challenge: Return the window boundaries too.
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
