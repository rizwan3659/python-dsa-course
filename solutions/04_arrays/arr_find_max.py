"""Reference solution · arr-find-max · Find Maximum

Complexity: O(n) time, O(1) space

Approach: Single scan with a running maximum.

Common mistakes:
- Starting best at 0: wrong when every number is negative.
- Sorting the list (O(n log n)) just to read one value.

Follow-up challenge: Return the index of the maximum instead of its value.
"""


def find_max(nums):
    best = nums[0]
    for n in nums[1:]:
        if n > best:
            best = n
    return best
