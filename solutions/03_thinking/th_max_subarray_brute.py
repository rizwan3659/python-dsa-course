"""Reference solution · th-max-subarray-brute · Best Subarray Sum (brute force)

Complexity: O(n²) time, O(1) space

Approach: Two loops with a running sum: O(n²). Recomputing
sum(nums[start:end + 1]) each time would be O(n³).

Common mistakes:
- Starting best at 0, which is wrong when every number is negative.
- Calling sum() on every slice: O(n³).

Follow-up challenge: Kadane's algorithm solves it in O(n) (arr-max-subarray
in topic 4). Use this brute force to stress-test it.
"""


def max_subarray(nums):
    best = nums[0]
    for start in range(len(nums)):
        total = 0
        for end in range(start, len(nums)):
            total += nums[end]          # sum of nums[start:end + 1], built incrementally
            best = max(best, total)
    return best
