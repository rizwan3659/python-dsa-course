"""Reference solution · arr-majority · Majority Element

Complexity: O(n) time, O(1) space (voting)

Approach: Counting works; Boyer–Moore voting does it in O(1) space.

Common mistakes:
- Sorting to find it (O(n log n)) when O(n) is possible.
- Returning the most common element without checking the majority guarantee.

Follow-up challenge: Solve it in O(1) extra space with the Boyer-Moore
voting algorithm.
"""


def majority(nums):
    candidate, count = None, 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate
