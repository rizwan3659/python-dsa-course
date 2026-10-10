"""arr-d8 · Rotate by more than the length
Topic 4: Arrays / Python Lists · medium · Traversal · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    rotate([1, 2, 3], 4)  ->  [3, 1, 2]
    rotate([1, 2, 3], 1)  ->  [3, 1, 2]
    rotate([1, 2], 2)  ->  [1, 2]

Check your work:   python dsa.py test arr-d8
Stuck?             python dsa.py hint arr-d8
"""


def rotate(nums, k):
    return nums[-k:] + nums[:-k]
