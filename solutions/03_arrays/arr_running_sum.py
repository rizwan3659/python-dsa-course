"""Reference solution · arr-running-sum · Running Sum

Complexity: O(n) time

Approach: Accumulate as you go; never re-add earlier numbers.
"""


def running_sum(nums):
    result = []
    total = 0
    for x in nums:
        total += x
        result.append(total)
    return result
