"""arr-pair-sorted · Optimize: Pair Sum in a Sorted List
Topic 3: Arrays / Python Lists · medium · Two Pointers · optimize

`nums` is sorted. Return True if two different positions add up to `target`.
The starter checks every pair: O(n²). Use the sorted order to make it O(n)
with O(1) extra space.

Examples:
    has_pair_sorted([1, 3, 4, 6, 8, 11], 10)  ->  True
    has_pair_sorted([1, 2, 3], 7)  ->  False
    has_pair_sorted([], 0)  ->  False

(2 more hidden tests run when you check your work.)

Target complexity: O(n) time, O(1) space

Check your work:   python dsa.py test arr-pair-sorted
Stuck?             python dsa.py hint arr-pair-sorted
"""


def has_pair_sorted(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return True
    return False
