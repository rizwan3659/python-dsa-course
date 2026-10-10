"""Reference solution · h-intersection · Intersection of Two Arrays

Complexity: O(n + m) plus sorting the result

Approach: set(a) & set(b), then sort.
"""


def intersection(a, b):
    return sorted(set(a) & set(b))
