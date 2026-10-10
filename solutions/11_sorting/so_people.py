"""Reference solution · so-people · Sort People

Complexity: O(n log n)

Approach: sorted with a tuple key.
"""


def sort_people(people):
    return sorted(people, key=lambda p: (p[1], p[0]))
