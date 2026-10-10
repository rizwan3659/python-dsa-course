"""Reference solution · arr-first-missing · First Missing Positive

Complexity: O(n) time, O(1) space

Approach: Cyclic placement: swap every in-range value to its home index,
then find the first index that does not hold i + 1.
"""


def first_missing_positive(nums):
    n = len(nums)
    for i in range(n):
        # place value v at index v - 1 while it belongs inside 1..n
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            j = nums[i] - 1
            nums[i], nums[j] = nums[j], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1
