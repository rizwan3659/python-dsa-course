"""Reference solution · so-kth-largest · Kth Largest Element

Complexity: O(n) average

Approach: Quickselect (or heap of size k).
"""


import random

def find_kth_largest(nums, k):
    target = len(nums) - k               # index in ascending order
    lo, hi = 0, len(nums) - 1
    nums = nums[:]
    while True:
        r = random.randint(lo, hi)
        nums[r], nums[hi] = nums[hi], nums[r]
        pivot, i = nums[hi], lo
        for j in range(lo, hi):
            if nums[j] < pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        nums[i], nums[hi] = nums[hi], nums[i]
        if i == target:
            return nums[i]
        if i < target:
            lo = i + 1
        else:
            hi = i - 1
