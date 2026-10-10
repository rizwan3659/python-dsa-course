"""Reference solution · bs-d3 · Not the FIRST occurrence
"""


def first_occurrence(nums, target):
    low, high, ans = 0, len(nums) - 1, -1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            ans = mid
            high = mid - 1
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return ans
