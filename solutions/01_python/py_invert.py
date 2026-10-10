"""Reference solution · py-invert · Invert a Dictionary

Complexity: O(n) time

Approach: Dict comprehension.
"""


def invert(d):
    return {v: k for k, v in d.items()}
