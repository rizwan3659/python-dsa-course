"""Reference solution · arr-remove-dups · Remove Duplicates from Sorted Array

Complexity: O(n) time, O(1) space

Approach: Slow/fast pointers: read scans, write marks where the next new
value goes.

Common mistakes:
- Deleting from the list while looping over it (O(n²), and skips elements).
- Returning the list instead of k.

Follow-up challenge: Allow each value at most twice.
"""


def remove_duplicates(nums):
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write
