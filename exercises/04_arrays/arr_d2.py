"""arr-d2 · Maximum of negative numbers
Topic 4: Arrays / Python Lists · easy · Traversal · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    find_max([-3, -1, -7])  ->  -1
    find_max([2, 8])  ->  8

Check your work:   python dsa.py test arr-d2
Stuck?             python dsa.py hint arr-d2
"""


def find_max(nums):
    best = 0
    for n in nums:
        if n > best:
            best = n
    return best
