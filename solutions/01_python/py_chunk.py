"""Reference solution · py-chunk · Chunk a List

Complexity: O(n) time

Approach: Step through start indexes in jumps of k and slice.

Common mistakes:
- Dropping the last, shorter chunk.
- An off-by-one in the range step (it must be k).

Follow-up challenge: Write a generator version with yield so huge lists are
never copied all at once.
"""


def chunk(items, k):
    return [items[i:i + k] for i in range(0, len(items), k)]
