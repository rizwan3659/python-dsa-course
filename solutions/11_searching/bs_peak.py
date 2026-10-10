"""Reference solution · bs-peak · Find a Peak Element

Complexity: O(log n)

Approach: Binary search following the uphill direction.
"""


def find_peak(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < nums[mid + 1]:
            lo = mid + 1          # uphill to the right: a peak exists there
        else:
            hi = mid
    return lo
