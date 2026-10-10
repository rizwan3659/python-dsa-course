"""Reference solution · bigo-has-pair · Pair With Target Sum (O(n))

Complexity: O(n) time, O(n) space

Approach: Set of seen values; check for target − x before adding x.
"""


def has_pair(nums, target):
    seen = set()
    for x in nums:
        if target - x in seen:
            return True
        seen.add(x)
    return False
