"""rq-static-sum · Range Sum Query (static)
Topic 22: Range Queries · easy · Prefix Sum

Build a class `RangeSum(nums)` with a method `sum_range(l, r)` that returns
`nums[l] + … + nums[r]` in O(1). The list never changes.

Examples:
    RangeSum([-2, 0, 3, -5, 2, -1]).sum_range(0, 2)  ->  1
    RangeSum([-2, 0, 3, -5, 2, -1]).sum_range(2, 5)  ->  -1
    RangeSum([-2, 0, 3, -5, 2, -1]).sum_range(0, 5)  ->  -3

(2 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ len(nums) ≤ 10^4
- up to 10^4 calls to sum_range, 0 ≤ l ≤ r < n

Before this: arr-dr4

Target complexity: O(n) to build, O(1) per query

Check your work:   python dsa.py test rq-static-sum
Stuck?             python dsa.py hint rq-static-sum
"""


class RangeSum:
    def __init__(self, nums):
        pass

    def sum_range(self, l, r):
        pass
