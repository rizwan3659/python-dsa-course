"""Reference solution · bigo-has-duplicate · Contains Duplicate (O(n))

Complexity: O(n) time, O(n) space

Approach: A set of seen values turns each “seen before?” check into O(1).

Common mistakes:
- Comparing every pair: O(n²).
- Sorting first: correct, but O(n log n).

Follow-up challenge: Return the first value that repeats, not just True or
False.
"""


def has_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False
