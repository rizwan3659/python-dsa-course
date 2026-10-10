"""Reference solution · arr-missing · Missing Number

Complexity: O(n) time, O(1) space

Approach: Expected sum n(n + 1)/2 minus the actual sum.
"""


def missing_number(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)
