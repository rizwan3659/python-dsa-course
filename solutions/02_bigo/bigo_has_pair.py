"""Reference solution · bigo-has-pair · Pair With Target Sum (O(n))

Complexity: O(n) time, O(n) space

Approach: Set of seen values; check for target − x before adding x.

Common mistakes:
- Adding nums[i] to the set before checking, so 4 + 4 = 8 matches with a
  single 4.
- Nested loops: O(n²).

Follow-up challenge: Return the pair of positions, not just True.
"""


def has_pair(nums, target):
    seen = set()
    for x in nums:
        if target - x in seen:
            return True
        seen.add(x)
    return False
