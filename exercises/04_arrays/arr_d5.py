"""arr-d5 · Reversed copy crashes
Topic 4: Arrays / Python Lists · easy · Traversal · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    reverse_copy([1, 2, 3])  ->  [3, 2, 1]
    reverse_copy([])  ->  []

Check your work:   python dsa.py test arr-d5
Stuck?             python dsa.py hint arr-d5
"""


def reverse_copy(nums):
    result = []
    for i in range(len(nums)):
        result.append(nums[len(nums) - i])
    return result
