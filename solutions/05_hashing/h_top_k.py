"""Reference solution · h-top-k · Top K Frequent Elements

Complexity: O(n log n) simple; O(n) with buckets

Approach: Count, then sort keys by frequency (or heapq.nlargest, or buckets
indexed by count for O(n)).
"""


from collections import Counter

def top_k_frequent(nums, k):
    counts = Counter(nums)
    order = sorted(counts, key=lambda x: (-counts[x], x))
    return order[:k]
