"""Reference solution · rq-static-sum · Range Sum Query (static)

Complexity: O(n) to build, O(1) per query

Approach: Prefix sums with a leading 0.

Common mistakes:
- Summing the slice in every query (O(n) each).
- Off-by-one: prefix[r] − prefix[l] misses nums[r].

Follow-up challenge: Do the same for a 2D matrix (rq-region-sum).
"""


class RangeSum:
    def __init__(self, nums):
        self.prefix = [0]
        for x in nums:
            self.prefix.append(self.prefix[-1] + x)   # prefix[k] = sum of the first k values

    def sum_range(self, l, r):
        return self.prefix[r + 1] - self.prefix[l]
