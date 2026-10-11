"""Reference solution · bs-insert · Search Insert Position

Complexity: O(log n)

Approach: Lower bound.

Common mistakes:
- Returning −1 when target is missing.
- Using hi = len(nums) − 1, so inserting at the end is impossible.

Follow-up challenge: Return the last position where target could be inserted
when duplicates exist.
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
