"""Reference solution · bs-peak · Find a Peak Element

Complexity: O(log n)

Approach: Binary search following the uphill direction.

Common mistakes:
- Scanning linearly: O(n).
- Reading nums[mid + 1] past the end.

Follow-up challenge: Find a peak in a 2D grid.
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
