"""Reference solution · bs-rotated-min · Minimum in Rotated Sorted Array

Complexity: O(log n)

Approach: Binary search toward the rotation point.

Common mistakes:
- Comparing mid with nums[lo] instead of nums[hi].
- Setting hi = mid − 1, which can skip the minimum.

Follow-up challenge: Return how many times the list was rotated.
"""


def find_min(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1          # the drop is to the right of mid
        else:
            hi = mid              # mid could be the minimum
    return nums[lo]
