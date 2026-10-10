"""arr-d3 · One step too far
Topic 4: Arrays / Python Lists · easy · Traversal · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    contains([1, 2], 5)  ->  False
    contains([1, 2], 2)  ->  True
    contains([], 1)  ->  False

Check your work:   python dsa.py test arr-d3
Stuck?             python dsa.py hint arr-d3
"""


def contains(nums, target):
    for i in range(len(nums) + 1):
        if nums[i] == target:
            return True
    return False
