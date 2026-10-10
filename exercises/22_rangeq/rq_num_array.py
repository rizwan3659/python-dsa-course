"""rq-num-array · Range Sum Query (mutable)
Topic 22: Range Queries · medium · Range Query

Build `NumArray(nums)` with `update(i, value)` (set nums[i] to value) and
`sum_range(l, r)`, both in O(log n). Use a Fenwick tree or a segment tree.

Examples:
    [1, 3, 5]: sum, then update(1, 2) and sum again
    update to a negative value
    updating to the same value twice

(2 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ len(nums) ≤ 3 × 10^4
- up to 3 × 10^4 calls in total

Before this: rq-fenwick

Target complexity: O(log n) per operation, O(n log n) to build this way

Check your work:   python dsa.py test rq-num-array
Stuck?             python dsa.py hint rq-num-array
"""


class NumArray:
    def __init__(self, nums):
        pass

    def update(self, i, value):
        pass

    def sum_range(self, l, r):
        pass
