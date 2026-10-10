"""Reference solution · bs-linear · Linear Search

Complexity: O(n)

Approach: Scan from the left.
"""


def linear_search(nums, target):
    for i, x in enumerate(nums):
        if x == target:
            return i
    return -1
