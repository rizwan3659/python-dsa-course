"""Reference solution · h-nearby-dup · Contains Nearby Duplicate

Complexity: O(n) time

Approach: Dict value → last index.
"""


def contains_nearby_duplicate(nums, k):
    last = {}
    for i, x in enumerate(nums):
        if x in last and i - last[x] <= k:
            return True
        last[x] = i
    return False
