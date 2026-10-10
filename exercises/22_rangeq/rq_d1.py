"""rq-d1 · The update that went the wrong way
Topic 22: Range Queries · medium · Range Query · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    _t()  ->  [1, 10, 28, 36]

Check your work:   python dsa.py test rq-d1
Stuck?             python dsa.py hint rq-d1
"""


class Fenwick:
    def __init__(self, n):
        self.tree = [0] * (n + 1)

    def add(self, i, delta):
        while i > 0:
            self.tree[i] += delta
            i -= i & -i

    def prefix(self, i):
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & -i
        return total
