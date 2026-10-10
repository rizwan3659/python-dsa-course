"""Reference solution · arr-find-max · Find Maximum

Complexity: O(n) time, O(1) space

Approach: Single scan with a running maximum.
"""


def find_max(nums):
    best = nums[0]
    for n in nums[1:]:
        if n > best:
            best = n
    return best
