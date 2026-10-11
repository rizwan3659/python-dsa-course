"""Reference solution · arr-range-sum · Optimize: Many Range Sums

Complexity: O(n + q) time

Approach: Prefix sums: O(n) to build, O(1) per query.

Common mistakes:
- Building a new prefix list for every query.
- Off-by-one: prefix[r] − prefix[l] instead of prefix[r + 1] − prefix[l].

Follow-up challenge: Support updates between queries (rq-num-array).
"""


def range_sums(nums, queries):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return [prefix[r + 1] - prefix[l] for l, r in queries]
