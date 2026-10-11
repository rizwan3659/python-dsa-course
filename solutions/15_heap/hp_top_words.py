"""Reference solution · hp-top-words · Top K Frequent Words

Complexity: O(n log k)

Approach: Counter + heap selection with a tuple key.

Common mistakes:
- Breaking ties in reverse alphabetical order in a heap.
- Sorting by count only.

Follow-up challenge: Do it in O(n log k).
"""


import heapq
from collections import Counter

def top_k_words(words, k):
    counts = Counter(words)
    return heapq.nsmallest(k, counts, key=lambda w: (-counts[w], w))
