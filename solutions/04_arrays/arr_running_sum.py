"""Reference solution · arr-running-sum · Running Sum

Complexity: O(n) time

Approach: Accumulate as you go; never re-add earlier numbers.

Common mistakes:
- Recomputing sum(nums[:i + 1]) for every i: O(n²).
- Modifying the input list when a new one was asked for.

Follow-up challenge: Use itertools.accumulate, then answer range sums with
the result.
"""


def running_sum(nums):
    result = []
    total = 0
    for x in nums:
        total += x
        result.append(total)
    return result
