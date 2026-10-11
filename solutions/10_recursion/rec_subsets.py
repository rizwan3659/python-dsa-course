"""Reference solution · rec-subsets · Subsets

Complexity: O(n · 2ⁿ)

Approach: Include/exclude decision tree.

Common mistakes:
- Appending path itself instead of a copy.
- Forgetting the empty subset.

Follow-up challenge: Subsets with duplicates (rec-subsets-dup).
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
