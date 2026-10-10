"""Reference solution · arr-rotate · Rotate Array

Complexity: O(n) time, O(1) space

Approach: Three reversals (O(1) extra space), or slice assignment nums[:] =
nums[-k:] + nums[:-k] (O(n) extra).
"""


def rotate(nums, k):
    n = len(nums)
    if n == 0:
        return
    k %= n

    def rev(lo, hi):
        while lo < hi:
            nums[lo], nums[hi] = nums[hi], nums[lo]
            lo += 1
            hi -= 1

    rev(0, n - 1)      # 7 6 5 4 3 2 1
    rev(0, k - 1)      # 5 6 7 | 4 3 2 1
    rev(k, n - 1)      # 5 6 7 | 1 2 3 4
