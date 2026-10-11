"""Reference solution · arr-sorted-squares · Squares of a Sorted Array

Complexity: O(n) time

Approach: Two pointers at the ends; place the larger square at the back of
the output.

Common mistakes:
- Squaring and sorting: O(n log n).
- Filling the result from the front with two pointers (the largest squares
  are at the ends).

Follow-up challenge: Return sorted absolute values of the cubes instead.
"""


def sorted_squares(nums):
    n = len(nums)
    out = [0] * n
    left, right = 0, n - 1
    for pos in range(n - 1, -1, -1):
        if abs(nums[left]) > abs(nums[right]):
            out[pos] = nums[left] ** 2
            left += 1
        else:
            out[pos] = nums[right] ** 2
            right -= 1
    return out
