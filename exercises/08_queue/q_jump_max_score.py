"""q-jump-max-score · Jump Game VI (maximum score)
Topic 8: Queue & Deque · hard · Monotonic Stack

Start at index 0 and finish at the last index. From index i you may jump to
any index i + 1 … i + k. Your score is the sum of `nums` at every index you
land on (including the first and last). Return the maximum score.

Examples:
    max_score([1, -1, -2, 4, -7, 3], 2)  ->  7
    max_score([10, -5, -2, 4, 0, 3], 3)  ->  17
    max_score([1, -5, -20, 4, -1, 3, -6, -3], 2)  ->  0

(4 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ len(nums), k ≤ 10^5
- −10^4 ≤ nums[i] ≤ 10^4

Before this: q-window-max, dp-house-robber

Target complexity: O(n) time, O(n) space

Check your work:   python dsa.py test q-jump-max-score
Stuck?             python dsa.py hint q-jump-max-score
"""


def max_score(nums, k):
    # your code here
    pass
