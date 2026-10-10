"""rec-x-d1 · The shared path
Topic 10: Recursion & Backtracking · medium · Backtracking · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    sorted(subsets([1, 2]))  ->  [[], [1], [1, 2], [2]]
    subsets([])  ->  [[]]

Check your work:   python dsa.py test rec-x-d1
Stuck?             python dsa.py hint rec-x-d1
"""


def subsets(nums):
    result = []
    path = []
    def go(i):
        if i == len(nums):
            result.append(path)
            return
        go(i + 1)
        path.append(nums[i])
        go(i + 1)
        path.pop()
    go(0)
    return result
