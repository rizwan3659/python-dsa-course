"""Reference solution · bigo-has-duplicate · Contains Duplicate (O(n))

Complexity: O(n) time, O(n) space

Approach: A set of seen values turns each “seen before?” check into O(1).
"""


def has_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False
