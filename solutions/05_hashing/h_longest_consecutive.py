"""Reference solution · h-longest-consecutive · Longest Consecutive Sequence

Complexity: O(n) time, O(n) space

Approach: Set + count upward only from run starts, so each number is visited
O(1) times.
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
