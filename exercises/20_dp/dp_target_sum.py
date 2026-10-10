"""dp-target-sum · Target Sum
Topic 20: Dynamic Programming · medium · Memoization / DP

Put a + or − in front of every number. Return how many ways the expression
can equal `target`.

Examples:
    find_target_sum_ways([1, 1, 1, 1, 1], 3)  ->  5
    find_target_sum_ways([1], 1)  ->  1
    find_target_sum_ways([1], 2)  ->  0

(3 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ len(nums) ≤ 20
- 0 ≤ nums[i] ≤ 1000, sum(nums) ≤ 1000
- −1000 ≤ target ≤ 1000

Before this: dp-partition

Target complexity: O(n · S) time and space where S = sum(nums)

Check your work:   python dsa.py test dp-target-sum
Stuck?             python dsa.py hint dp-target-sum
"""


def find_target_sum_ways(nums, target):
    # your code here
    pass
