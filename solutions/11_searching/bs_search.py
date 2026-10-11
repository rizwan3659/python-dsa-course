"""Reference solution · bs-search · Binary Search

Complexity: O(log n)

Approach: Classic binary search with inclusive bounds.

Common mistakes:
- while lo < hi with hi = len(nums) − 1, which misses the last element.
- Setting lo = mid instead of mid + 1, which can loop forever.

Follow-up challenge: Write it recursively, then with bisect.
"""


def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
