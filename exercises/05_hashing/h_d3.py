"""h-d3 · Pairs with itself
Topic 5: Hash Tables · medium · Hashing · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    two_sum([3, 2, 4], 6)  ->  [1, 2]
    two_sum([3, 3], 6)  ->  [0, 1]

Check your work:   python dsa.py test h-d3
Stuck?             python dsa.py hint h-d3
"""


def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        seen[x] = i
        if target - x in seen:
            return [seen[target - x], i]
