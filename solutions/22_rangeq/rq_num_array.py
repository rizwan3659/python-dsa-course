"""Reference solution · rq-num-array · Range Sum Query (mutable)

Complexity: O(log n) per operation, O(n log n) to build this way

Approach: Fenwick tree storing differences, plus the current array.

Common mistakes:
- Adding value instead of value − old (the update then accumulates).
- Rebuilding prefix sums on every update: O(n).

Follow-up challenge: Implement the same class with an iterative segment tree
and compare the code.
"""


class NumArray:
    def __init__(self, nums):
        self.nums = [0] * len(nums)
        self.tree = [0] * (len(nums) + 1)
        for i, x in enumerate(nums):
            self.update(i, x)

    def _add(self, i, delta):
        i += 1
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & -i

    def _prefix(self, i):            # sum of positions 0..i - 1
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & -i
        return total

    def update(self, i, value):
        self._add(i, value - self.nums[i])   # Fenwick stores changes, so add the difference
        self.nums[i] = value

    def sum_range(self, l, r):
        return self._prefix(r + 1) - self._prefix(l)
