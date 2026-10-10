"""arr-d1 · The total that is not a total
Topic 3: Arrays / Python Lists · easy · Traversal · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    total([1, 2, 3])  ->  6
    total([])  ->  0
    total([5])  ->  5

Check your work:   python dsa.py test arr-d1
Stuck?             python dsa.py hint arr-d1
"""


def total(nums):
    result = 0
    for n in nums:
        result = n
    return result
