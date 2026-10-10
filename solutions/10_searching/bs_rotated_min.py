"""Reference solution · bs-rotated-min · Minimum in Rotated Sorted Array

Complexity: O(log n)

Approach: Binary search toward the rotation point.
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
