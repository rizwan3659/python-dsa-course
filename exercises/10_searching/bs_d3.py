"""bs-d3 · Not the FIRST occurrence
Topic 10: Searching · medium · Binary Search · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    first_occurrence([2, 2, 2, 2, 2], 2)  ->  0
    first_occurrence([1, 2, 2, 3], 2)  ->  1

Check your work:   python dsa.py test bs-d3
Stuck?             python dsa.py hint bs-d3
"""


def first_occurrence(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
