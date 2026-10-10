"""Reference solution · h-jewels · Jewels and Stones

Complexity: O(n + m) time

Approach: Set lookup per stone.
"""


def num_jewels(jewels, stones):
    j = set(jewels)
    return sum(1 for s in stones if s in j)
