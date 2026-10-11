"""Reference solution · so-relative · Relative Sort Array

Complexity: O(n log n)

Approach: Custom sort key (rank, value).

Common mistakes:
- Sorting the leftover values in arr1 order instead of ascending.
- Using arr2.index() inside the key: O(n · m).

Follow-up challenge: Do it with counting sort when values are small.
"""


def relative_sort(arr1, arr2):
    rank = {v: i for i, v in enumerate(arr2)}
    return sorted(arr1, key=lambda x: (rank.get(x, len(arr2)), x))
