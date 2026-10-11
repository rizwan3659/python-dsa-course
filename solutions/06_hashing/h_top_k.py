"""Reference solution · h-top-k · Top K Frequent Elements

Complexity: O(n log n) simple; O(n) with buckets

Approach: Count, then sort keys by frequency (or heapq.nlargest, or buckets
indexed by count for O(n)).

Common mistakes:
- Sorting all values by count: O(n log n) (acceptable, but not optimal).
- Forgetting the tie-break by value.

Follow-up challenge: Solve it in O(n) with buckets indexed by frequency.
"""


from collections import Counter

def top_k_frequent(nums, k):
    counts = Counter(nums)
    order = sorted(counts, key=lambda x: (-counts[x], x))
    return order[:k]
