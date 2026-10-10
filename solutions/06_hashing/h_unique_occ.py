"""Reference solution · h-unique-occ · Unique Number of Occurrences

Complexity: O(n) time

Approach: Counter, then a set of the counts.
"""


from collections import Counter

def unique_occurrences(nums):
    counts = Counter(nums).values()
    return len(counts) == len(set(counts))
