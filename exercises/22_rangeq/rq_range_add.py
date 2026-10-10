"""rq-range-add · Apply Range Additions
Topic 22: Range Queries · easy · Prefix Sum

Start with n zeros. Each update `(l, r, v)` adds v to every position from l
to r inclusive. Return the final list, in O(n + number of updates).

Examples:
    apply_updates(5, [(1, 3, 2), (2, 4, 3), (0, 2, -2)])  ->  [-2, 0, 3, 5, 3]
    apply_updates(3, [])  ->  [0, 0, 0]
    apply_updates(1, [(0, 0, 7)])  ->  [7]

(2 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ n ≤ 10^5
- 0 ≤ len(updates) ≤ 10^5, 0 ≤ l ≤ r < n

Target complexity: O(n + u) time, O(n) space

Check your work:   python dsa.py test rq-range-add
Stuck?             python dsa.py hint rq-range-add
"""


def apply_updates(n, updates):
    # your code here
    pass
