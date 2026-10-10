"""Reference solution · so-relative · Relative Sort Array

Complexity: O(n log n)

Approach: Custom sort key (rank, value).
"""


def relative_sort(arr1, arr2):
    rank = {v: i for i, v in enumerate(arr2)}
    return sorted(arr1, key=lambda x: (rank.get(x, len(arr2)), x))
