"""arr-d4 · Removing while looping
Topic 3: Arrays / Python Lists · medium · Traversal · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    remove_evens([2, 4, 6, 1])  ->  [1]
    remove_evens([1, 3])  ->  [1, 3]

Check your work:   python dsa.py test arr-d4
Stuck?             python dsa.py hint arr-d4
"""


def remove_evens(nums):
    for n in nums:
        if n % 2 == 0:
            nums.remove(n)
    return nums
