"""Reference solution · rq-segtree-min · Segment Tree for Range Minimum

Complexity: O(n) build, O(log n) per update and query, O(n) space

Approach: Iterative segment tree of size 2n with bottom-up query.

Common mistakes:
- Using a Fenwick tree with "prefix minus prefix": min has no inverse.
- Forgetting to update ancestors after a point update.
- Mixing inclusive and half-open ranges.

Follow-up challenge: Add range assignment ("set l..r to v") with lazy
propagation.
"""


class MinTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * self.n + list(nums)       # leaves at n .. 2n - 1
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = min(self.tree[2 * i], self.tree[2 * i + 1])

    def update(self, i, value):
        i += self.n
        self.tree[i] = value
        while i > 1:                                 # fix every ancestor
            i //= 2
            self.tree[i] = min(self.tree[2 * i], self.tree[2 * i + 1])

    def query(self, l, r):
        best = float("inf")
        l += self.n
        r += self.n + 1                              # half-open [l, r)
        while l < r:
            if l & 1:                                # l is a right child: take it, move right
                best = min(best, self.tree[l])
                l += 1
            if r & 1:                                # r is a right boundary: step left, take it
                r -= 1
                best = min(best, self.tree[r])
            l //= 2
            r //= 2
        return best
