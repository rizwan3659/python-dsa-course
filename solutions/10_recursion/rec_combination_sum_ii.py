"""Reference solution · rec-combination-sum-ii · Combination Sum II

Complexity: O(2ⁿ) worst case, heavily pruned

Approach: Sorted backtracking with duplicate skipping and early break.

Common mistakes:
- Generating all combinations and removing duplicates with a set afterwards
  (slow on [1] * 30).
- Skipping duplicates with i > 0 instead of i > start, which also removes
  valid combinations like [1, 1, 6].

Follow-up challenge: Return only the number of combinations, using DP over
sums instead of backtracking.
"""


def combination_sum2(candidates, target):
    nums = sorted(candidates)
    result, path = [], []

    def go(start, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue                 # same value at the same depth: duplicate subtree
            if nums[i] > remaining:
                break                    # sorted: nothing after this fits either
            path.append(nums[i])
            go(i + 1, remaining - nums[i])
            path.pop()

    go(0, target)
    return result
