"""Reference solution · h-intersect-counts · Intersection With Counts

Complexity: O(n + m) plus sorting

Approach: Counter & Counter takes the minimum count per key.

Common mistakes:
- Using sets, which loses the counts.
- Decrementing a count below zero.

Follow-up challenge: b is too large to fit in memory and arrives in chunks:
what do you store?
"""


from collections import Counter

def intersect(a, b):
    both = Counter(a) & Counter(b)       # minimum of the counts
    return sorted(both.elements())
