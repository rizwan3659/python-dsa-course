"""Reference solution · arr-majority · Majority Element

Complexity: O(n) time, O(1) space (voting)

Approach: Counting works; Boyer–Moore voting does it in O(1) space.
"""


def majority(nums):
    candidate, count = None, 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate
