"""Reference solution · rec-permutations · Permutations

Complexity: O(n · n!)

Approach: Backtracking over unused elements.

Common mistakes:
- Not undoing the "used" mark after the recursive call.
- Appending path itself instead of a copy.

Follow-up challenge: The input may contain duplicates: return unique
permutations.
"""


def permutations(nums):
    result, path, used = [], [], [False] * len(nums)

    def backtrack():
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i, x in enumerate(nums):
            if not used[i]:
                used[i] = True
                path.append(x)
                backtrack()
                path.pop()
                used[i] = False

    backtrack()
    return result
