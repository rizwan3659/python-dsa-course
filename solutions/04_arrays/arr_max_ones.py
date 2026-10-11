"""Reference solution · arr-max-ones · Max Consecutive Ones

Complexity: O(n) time

Approach: Current run length + best so far.

Common mistakes:
- Forgetting to compare the final run after the loop ends.
- Resetting the best count instead of the current count on a 0.

Follow-up challenge: Allow one 0 to be flipped (arr-longest-ones-k).
"""


def max_ones(nums):
    best = run = 0
    for x in nums:
        run = run + 1 if x == 1 else 0
        best = max(best, run)
    return best
