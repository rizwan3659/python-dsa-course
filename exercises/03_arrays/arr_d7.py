"""arr-d7 · Move zeroes forgets the zeroes
Topic 3: Arrays / Python Lists · medium · Two Pointers · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    move_zeroes([0, 1, 0, 3])  ->  [1, 3, 0, 0]
    move_zeroes([1, 2])  ->  [1, 2]

Check your work:   python dsa.py test arr-d7
Stuck?             python dsa.py hint arr-d7
"""


def move_zeroes(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write] = nums[read]
            write += 1
    return nums
