"""Reference solution · h-intersect-counts · Intersection With Counts

Complexity: O(n + m) plus sorting

Approach: Counter & Counter takes the minimum count per key.
"""


from collections import Counter

def intersect(a, b):
    both = Counter(a) & Counter(b)       # minimum of the counts
    return sorted(both.elements())
