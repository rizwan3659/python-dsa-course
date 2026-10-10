"""Reference solution · bit-missing · Missing Number

Complexity: O(n) time, O(1) space

Approach: XOR of the full range with the list; or n(n + 1)/2 − sum(nums).

Common mistakes:
- Forgetting to include n in the range.
- Sorting first (O(n log n)).

Follow-up challenge: Two numbers are missing. Find both with XOR (see
bit-two-singles).
"""


def missing_number(nums):
    result = len(nums)            # n itself has no index
    for i, x in enumerate(nums):
        result ^= i ^ x
    return result
