"""Reference solution · rec-x-d1 · The shared path
"""


def subsets(nums):
    result = []
    path = []
    def go(i):
        if i == len(nums):
            result.append(path[:])
            return
        go(i + 1)
        path.append(nums[i])
        go(i + 1)
        path.pop()
    go(0)
    return result
