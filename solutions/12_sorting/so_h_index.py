"""Reference solution · so-h-index · H-Index

Complexity: O(n log n)

Approach: Sort descending and scan.
"""


def h_index(citations):
    c = sorted(citations, reverse=True)
    h = 0
    while h < len(c) and c[h] >= h + 1:
        h += 1
    return h
