"""Reference solution · bs-count · Count Occurrences in a Sorted List

Complexity: O(log n)

Approach: bisect_right − bisect_left.
"""


import bisect

def count_occurrences(nums, target):
    return bisect.bisect_right(nums, target) - bisect.bisect_left(nums, target)
