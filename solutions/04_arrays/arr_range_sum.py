"""Reference solution · arr-range-sum · Optimize: Many Range Sums

Complexity: O(n + q) time

Approach: Prefix sums: O(n) to build, O(1) per query.
"""


def range_sums(nums, queries):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return [prefix[r + 1] - prefix[l] for l, r in queries]
