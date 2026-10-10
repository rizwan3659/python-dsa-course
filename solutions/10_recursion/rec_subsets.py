"""Reference solution · rec-subsets · Subsets

Complexity: O(n · 2ⁿ)

Approach: Include/exclude decision tree.
"""


def subsets(nums):
    result, path = [], []

    def backtrack(i):
        if i == len(nums):
            result.append(path[:])
            return
        path.append(nums[i])        # include nums[i]
        backtrack(i + 1)
        path.pop()                  # exclude nums[i]
        backtrack(i + 1)

    backtrack(0)
    return result
