"""Reference solution · so-min-diff · Minimum Absolute Difference Pairs

Complexity: O(n log n)

Approach: Sort, then scan adjacent differences.
"""


def min_abs_pairs(arr):
    arr = sorted(arr)
    best = min(arr[i + 1] - arr[i] for i in range(len(arr) - 1))
    return [[arr[i], arr[i + 1]] for i in range(len(arr) - 1) if arr[i + 1] - arr[i] == best]
