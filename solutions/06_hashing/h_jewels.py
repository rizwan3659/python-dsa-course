"""Reference solution · h-jewels · Jewels and Stones

Complexity: O(n + m) time

Approach: Set lookup per stone.

Common mistakes:
- Treating "a" and "A" as the same.
- Using `ch in jewels` on a long string inside the loop (a set is O(1)).

Follow-up challenge: Return the count per jewel type.
"""


def num_jewels(jewels, stones):
    j = set(jewels)
    return sum(1 for s in stones if s in j)
