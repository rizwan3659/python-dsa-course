"""Reference solution · arr-pivot · Find Pivot Index

Complexity: O(n) time, O(1) space

Approach: One running left sum; the right sum follows from the total.
"""


def pivot_index(nums):
    total = sum(nums)
    left = 0
    for i, x in enumerate(nums):
        if left == total - left - x:
            return i
        left += x
    return -1
