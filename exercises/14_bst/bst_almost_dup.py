"""bst-almost-dup · Contains Nearby Almost Duplicate
Topic 14: Binary Search Trees · hard · BST Property

Return `True` if there are two different indexes i and j with `|i − j| ≤ k`
and `|nums[i] − nums[j]| ≤ t`. In languages with a balanced BST you would
use a sorted set; in Python, use buckets of width t + 1.

Examples:
    almost_duplicate([1, 2, 3, 1], 3, 0)  ->  True
    almost_duplicate([1, 0, 1, 1], 1, 2)  ->  True
    almost_duplicate([1, 5, 9, 1, 5, 9], 2, 3)  ->  False

(4 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ len(nums) ≤ 10^5
- 1 ≤ k ≤ 10^5, 0 ≤ t ≤ 10^9

Before this: h-nearby-dup

Target complexity: O(n) time, O(k) space

Check your work:   python dsa.py test bst-almost-dup
Stuck?             python dsa.py hint bst-almost-dup
"""


def almost_duplicate(nums, k, t):
    # your code here
    pass
