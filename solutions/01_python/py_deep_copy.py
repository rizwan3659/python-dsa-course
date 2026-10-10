"""Reference solution · py-deep-copy · Deep Copy Nested Lists

Complexity: O(total number of elements)

Approach: Recursively rebuild every list; share immutable values.

Common mistakes:
- x[:] or list(x), which only copies the outer list.
- Copying ints (unnecessary: they are immutable).

Follow-up challenge: Extend it to dicts and sets, and handle a list that
contains itself (keep a dict of already-copied objects by id).
"""


def deep_copy(x):
    if isinstance(x, list):
        return [deep_copy(item) for item in x]   # new list, copied items
    return x                                    # immutable: safe to share
