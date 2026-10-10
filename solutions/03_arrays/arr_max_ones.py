"""Reference solution · arr-max-ones · Max Consecutive Ones

Complexity: O(n) time

Approach: Current run length + best so far.
"""


def max_ones(nums):
    best = run = 0
    for x in nums:
        run = run + 1 if x == 1 else 0
        best = max(best, run)
    return best
