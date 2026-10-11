"""Reference solution · arr-monotonic · Monotonic Array

Complexity: O(n) time

Approach: Compare neighbours once, keeping two flags.

Common mistakes:
- Requiring strictly increasing values (equal neighbours are allowed).
- Checking only the first pair to decide the direction.

Follow-up challenge: Do it in a single pass that tracks both directions.
"""


def is_monotonic(nums):
    up = down = True
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            up = False
        if nums[i] > nums[i - 1]:
            down = False
    return up or down
