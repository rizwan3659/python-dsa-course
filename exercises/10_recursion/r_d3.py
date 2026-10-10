"""r-d3 · All subsets are empty
Topic 10: Recursion & Backtracking · medium · Backtracking · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    subsets([1, 2])  ->  [[1, 2], [1], [2], []]

Check your work:   python dsa.py test r-d3
Stuck?             python dsa.py hint r-d3
"""


def subsets(nums):
    result, path = [], []
    def backtrack(i):
        if i == len(nums):
            result.append(path)
            return
        path.append(nums[i])
        backtrack(i + 1)
        path.pop()
        backtrack(i + 1)
    backtrack(0)
    return result
