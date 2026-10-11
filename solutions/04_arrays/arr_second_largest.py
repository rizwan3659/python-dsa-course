"""Reference solution · arr-second-largest · Second Largest

Complexity: O(n) time, O(1) space

Approach: One pass keeping the two largest distinct values seen so far.

Common mistakes:
- Returning the largest again when it appears twice.
- Sorting: O(n log n) for an O(n) problem.

Follow-up challenge: Return the k-th largest distinct value.
"""


def second_largest(nums):
    first = second = None
    for x in nums:
        if first is None or x > first:
            first, second = x, first
        elif x != first and (second is None or x > second):
            second = x
    return second
