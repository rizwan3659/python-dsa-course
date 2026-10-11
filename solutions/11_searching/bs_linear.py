"""Reference solution · bs-linear · Linear Search

Complexity: O(n)

Approach: Scan from the left.

Common mistakes:
- Returning the last occurrence instead of the first.
- Returning None instead of −1.

Follow-up challenge: Return all indexes where target occurs.
"""


def linear_search(nums, target):
    for i, x in enumerate(nums):
        if x == target:
            return i
    return -1
