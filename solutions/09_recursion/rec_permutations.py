"""Reference solution · rec-permutations · Permutations

Complexity: O(n · n!)

Approach: Backtracking over unused elements.
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
