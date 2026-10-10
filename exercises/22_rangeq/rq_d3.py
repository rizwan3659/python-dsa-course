"""rq-d3 · Range sum misses the last element
Topic 22: Range Queries · easy · Prefix Sum · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    range_sum(build([1, 2, 3, 4]), 1, 2)  ->  5
    range_sum(build([1, 2, 3, 4]), 0, 3)  ->  10
    range_sum(build([7]), 0, 0)  ->  7

Check your work:   python dsa.py test rq-d3
Stuck?             python dsa.py hint rq-d3
"""


def build(nums):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return prefix

def range_sum(prefix, l, r):          # inclusive l..r
    return prefix[r] - prefix[l]
