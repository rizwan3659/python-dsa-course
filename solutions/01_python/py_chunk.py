"""Reference solution · py-chunk · Chunk a List

Complexity: O(n) time

Approach: Step through start indexes in jumps of k and slice.
"""


def chunk(items, k):
    return [items[i:i + k] for i in range(0, len(items), k)]
