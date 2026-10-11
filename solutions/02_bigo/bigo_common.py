"""Reference solution · bigo-common · Optimize: Common Elements

Complexity: O(n + m) time

Approach: Convert b to a set once.

Common mistakes:
- Keeping `x in b` with b as a list inside the loop.
- Converting a to a set, which loses its order.

Follow-up challenge: Keep duplicates only as many times as they appear in b.
"""


def common(a, b):
    bset = set(b)
    return [x for x in a if x in bset]
