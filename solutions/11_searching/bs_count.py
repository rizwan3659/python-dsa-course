"""Reference solution · bs-count · Count Occurrences in a Sorted List

Complexity: O(log n)

Approach: bisect_right − bisect_left.

Common mistakes:
- Using nums.count(target), which is O(n).
- bisect_right − bisect_left reversed (negative counts).

Follow-up challenge: Write both bisect functions yourself.
"""


import bisect

def count_occurrences(nums, target):
    return bisect.bisect_right(nums, target) - bisect.bisect_left(nums, target)
