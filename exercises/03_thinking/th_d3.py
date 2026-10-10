"""th-d3 · Pairs counted twice
Topic 3: Algorithmic Thinking · medium · Brute Force · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    count_pairs([1, 2, 3, 4], 5)  ->  2
    count_pairs([3, 3], 6)  ->  1
    count_pairs([2], 4)  ->  0

Check your work:   python dsa.py test th-d3
Stuck?             python dsa.py hint th-d3
"""


def count_pairs(nums, target):
    count = 0
    for i in range(len(nums)):
        for j in range(len(nums)):
            if nums[i] + nums[j] == target:
                count += 1
    return count
