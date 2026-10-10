"""bs-d4 · Binary search on unsorted data
Topic 10: Searching · easy · Binary Search · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    contains([7, 2, 9, 4], 7)  ->  True
    contains([7, 2, 9, 4], 5)  ->  False

Check your work:   python dsa.py test bs-d4
Stuck?             python dsa.py hint bs-d4
"""


def contains(nums, target):
    import bisect
    i = bisect.bisect_left(nums, target)
    return i < len(nums) and nums[i] == target

print(contains([7, 2, 9, 4], 7))
