"""Reference solution · arr-pivot · Find Pivot Index

Complexity: O(n) time, O(1) space

Approach: One running left sum; the right sum follows from the total.

Common mistakes:
- Including nums[i] in the left or right sum.
- Recomputing both sums for every index: O(n²).

Follow-up challenge: Return every pivot index, not just the leftmost.
"""


def pivot_index(nums):
    total = sum(nums)
    left = 0
    for i, x in enumerate(nums):
        if left == total - left - x:
            return i
        left += x
    return -1
