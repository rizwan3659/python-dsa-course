"""Reference solution · h-nearby-dup · Contains Nearby Duplicate

Complexity: O(n) time

Approach: Dict value → last index.

Common mistakes:
- Remembering only the first index of each value instead of the latest.
- Comparing every pair within distance k: O(n · k).

Follow-up challenge: Allow values to differ by at most t too
(bst-almost-dup).
"""


def contains_nearby_duplicate(nums, k):
    last = {}
    for i, x in enumerate(nums):
        if x in last and i - last[x] <= k:
            return True
        last[x] = i
    return False
