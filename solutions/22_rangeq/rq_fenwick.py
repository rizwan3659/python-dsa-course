"""Reference solution · rq-fenwick · Build a Fenwick Tree

Complexity: O(log n) per operation, O(n) space

Approach: Binary indexed tree with 1-based internal indexes.

Common mistakes:
- Using 0-based indexes inside the loops (i & −i is 0: an infinite loop).
- range_sum(l, r) computed as prefix_sum(r) − prefix_sum(l), which drops
  position l.

Follow-up challenge: Build the tree in O(n) from an initial list instead of
n calls to add.
"""


class Fenwick:
    def __init__(self, n):
        self.tree = [0] * (n + 1)     # 1-based internally

    def add(self, i, delta):
        i += 1
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & -i               # climb to the next node covering i

    def prefix_sum(self, i):
        i += 1
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & -i               # drop the lowest set bit
        return total

    def range_sum(self, l, r):
        return self.prefix_sum(r) - (self.prefix_sum(l - 1) if l > 0 else 0)
