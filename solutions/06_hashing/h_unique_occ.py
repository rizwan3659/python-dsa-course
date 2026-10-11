"""Reference solution · h-unique-occ · Unique Number of Occurrences

Complexity: O(n) time

Approach: Counter, then a set of the counts.

Common mistakes:
- Comparing the number of distinct values with the length of the list.
- Counting with list.count in a loop: O(n²).

Follow-up challenge: Return the values that share an occurrence count with
another value.
"""


from collections import Counter

def unique_occurrences(nums):
    counts = Counter(nums).values()
    return len(counts) == len(set(counts))
