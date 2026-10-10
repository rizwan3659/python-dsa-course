"""Reference solution · bigo-count-pairs · Optimize: Count Pairs With Difference k

Complexity: O(n) time, O(n) space

Approach: Hash map of counts of values seen so far.
"""


def count_diff_pairs(nums, k):
    seen = {}
    count = 0
    for x in nums:
        count += seen.get(x - k, 0) + seen.get(x + k, 0)
        seen[x] = seen.get(x, 0) + 1
    return count
