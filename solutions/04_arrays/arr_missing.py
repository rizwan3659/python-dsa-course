"""Reference solution · arr-missing · Missing Number

Complexity: O(n) time, O(1) space

Approach: Expected sum n(n + 1)/2 minus the actual sum.

Common mistakes:
- Forgetting that n itself may be the missing number.
- Sorting first: O(n log n).

Follow-up challenge: Solve it with XOR (bit-missing).
"""


def missing_number(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)
