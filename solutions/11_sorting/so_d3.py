"""Reference solution · so-d3 · k-th largest, off by one
"""


def kth_largest(nums, k):
    return sorted(nums, reverse=True)[k - 1]
