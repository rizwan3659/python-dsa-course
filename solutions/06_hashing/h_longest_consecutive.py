"""Reference solution · h-longest-consecutive · Longest Consecutive Sequence

Complexity: O(n) time, O(n) space

Approach: Set + count upward only from run starts, so each number is visited
O(1) times.

Common mistakes:
- Starting a count from every number, not just run starts: O(n²).
- Sorting: O(n log n).

Follow-up challenge: Return the run itself.
"""


def longest_consecutive(nums):
    s = set(nums)
    best = 0
    for x in s:
        if x - 1 not in s:            # x starts a run
            length = 1
            while x + length in s:
                length += 1
            best = max(best, length)
    return best
