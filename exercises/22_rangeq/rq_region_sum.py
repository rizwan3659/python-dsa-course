"""rq-region-sum · 2D Region Sums
Topic 22: Range Queries · medium · Prefix Sum

Given a matrix and a list of queries `(r1, c1, r2, c2)`, return the sum of
each rectangle (inclusive corners). Precompute so that each query is O(1).

Examples:
    region_sums([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]], [(2, 1, 4, 3), (1, 1, 2, 2), (1, 2, 2, 4)])  ->  [8, 11, 12]
    region_sums([[5]], [(0, 0, 0, 0)])  ->  [5]
    region_sums([[1, 2], [3, 4]], [(0, 0, 1, 1), (1, 0, 1, 1), (0, 1, 1, 1)])  ->  [10, 7, 6]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ rows, cols ≤ 200
- up to 10^4 queries

Before this: rq-static-sum

Target complexity: O(rows · cols) to build, O(1) per query

Check your work:   python dsa.py test rq-region-sum
Stuck?             python dsa.py hint rq-region-sum
"""


def region_sums(matrix, queries):
    # your code here
    pass
