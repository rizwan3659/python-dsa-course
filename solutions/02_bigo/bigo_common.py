"""Reference solution · bigo-common · Optimize: Common Elements

Complexity: O(n + m) time

Approach: Convert b to a set once.
"""


def common(a, b):
    bset = set(b)
    return [x for x in a if x in bset]
