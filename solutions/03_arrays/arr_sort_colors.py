"""Reference solution · arr-sort-colors · Sort Colors (0s, 1s and 2s)

Complexity: O(n) time, O(1) space

Approach: Dutch national flag: three pointers partition into 0s | 1s |
unknown | 2s.
"""


def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
