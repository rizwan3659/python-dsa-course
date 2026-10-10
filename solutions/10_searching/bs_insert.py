"""Reference solution · bs-insert · Search Insert Position

Complexity: O(log n)

Approach: Lower bound.
"""


def search_insert(nums, target):
    low, high = 0, len(nums)
    while low < high:
        mid = (low + high) // 2
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid
    return low
