"""Reference solution · rec-count-paths · Count Grid Paths

Complexity: O(r × c)

Approach: paths(r, c) = paths(r − 1, c) + paths(r, c − 1), cached.
"""


from functools import lru_cache

@lru_cache(maxsize=None)
def count_paths(r, c):
    if r == 0 or c == 0:
        return 1
    return count_paths(r - 1, c) + count_paths(r, c - 1)
