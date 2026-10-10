"""Reference solution · rec-subsets-dup · Subsets II (with duplicates)

Complexity: O(n · 2ⁿ)

Approach: Backtracking over start indexes with duplicate skipping; record
every path.

Common mistakes:
- Using a set of tuples to deduplicate afterwards (works, but wastes the
  whole duplicate search).
- Forgetting to sort first.

Follow-up challenge: Count the distinct subsets with a formula: the product
of (count of each value + 1).
"""


def subsets_with_dup(nums):
    nums = sorted(nums)
    result, path = [], []

    def go(start):
        result.append(path[:])           # every node of the tree is a subset
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            path.append(nums[i])
            go(i + 1)
            path.pop()

    go(0)
    return result
