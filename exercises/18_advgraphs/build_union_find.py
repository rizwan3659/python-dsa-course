"""build-union-find · Build Union-Find (Disjoint Set Union)
Topic 18: Advanced Graphs · medium · Design / Build · build

Track which of n elements (0..n − 1) are connected as you merge groups.

Requirements:
- `UnionFind(n)`: every element starts in its own group
- `find(x)` → the representative (root) of x’s group, with path compression
- `union(a, b)` → True if two groups were merged, False if already together;
  union by size
- `connected(a, b)`
- `self.count`: number of groups

Examples:
    union, re-union, connected, count
    everything merged into one group
    a 100,000-element chain (must be fast)

Target complexity: O(α(n)) amortized per operation (practically constant)

Check your work:   python dsa.py test build-union-find
Stuck?             python dsa.py hint build-union-find
"""


class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.count = n

    def find(self, x):
        pass

    def union(self, a, b):
        pass

    def connected(self, a, b):
        pass
