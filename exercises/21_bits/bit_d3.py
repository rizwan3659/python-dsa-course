"""bit-d3 · The missing number goes missing
Topic 21: Bit Manipulation · medium · Bit Manipulation · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    missing_number([3, 0, 1])  ->  2
    missing_number([0, 1])  ->  2
    missing_number([1])  ->  0

Check your work:   python dsa.py test bit-d3
Stuck?             python dsa.py hint bit-d3
"""


def missing_number(nums):
    result = 0
    for i in range(len(nums)):
        result ^= i ^ nums[i]
    return result
