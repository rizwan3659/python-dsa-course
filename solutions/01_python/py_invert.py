"""Reference solution · py-invert · Invert a Dictionary

Complexity: O(n) time

Approach: Dict comprehension.

Common mistakes:
- Iterating over d (keys only) and losing the values.
- Mutating d while iterating over it.

Follow-up challenge: Values may repeat: map each value to the list of its
keys.
"""


def invert(d):
    return {v: k for k, v in d.items()}
