"""Reference solution · arr-subarray-sum-k · Subarray Sum Equals K

Complexity: O(n) time, O(n) space

Approach: Prefix sums + a hash map of how often each prefix has occurred. (A
sliding window fails with negatives.)
"""


def subarray_sum(nums, k):
    count = 0
    prefix = 0
    seen = {0: 1}          # prefix sum -> how many times it occurred
    for x in nums:
        prefix += x
        count += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return count
