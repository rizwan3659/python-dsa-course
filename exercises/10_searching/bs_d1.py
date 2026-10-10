"""bs-d1 · The last element is never checked
Topic 10: Searching · easy · Binary Search · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    binary_search([5], 5)  ->  0
    binary_search([1, 3], 3)  ->  1

Check your work:   python dsa.py test bs-d1
Stuck?             python dsa.py hint bs-d1
"""


def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low < high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
