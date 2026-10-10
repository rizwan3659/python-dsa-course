"""s-d4 · Greater or equal?
Topic 6: Stack · medium · Monotonic Stack · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    next_greater([2, 2])  ->  [-1, -1]
    next_greater([1, 3])  ->  [3, -1]

Check your work:   python dsa.py test s-d4
Stuck?             python dsa.py hint s-d4
"""


def next_greater(nums):
    result = [-1] * len(nums)
    stack = []
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] <= x:
            result[stack.pop()] = x
        stack.append(i)
    return result
