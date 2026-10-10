"""rq-fenwick · Build a Fenwick Tree
Topic 22: Range Queries · medium · Range Query

Implement `Fenwick(n)` for positions 0..n − 1 with `add(i, delta)`,
`prefix_sum(i)` (sum of positions 0..i) and `range_sum(l, r)`, each in O(log
n).

Examples:
    values 1..5: prefix_sum(0), prefix_sum(4), range_sum(1, 3)
    after add(2, 10)
    a single position, negative value

(2 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ n ≤ 10^5
- up to 10^5 operations

Before this: rq-p2, rq-p3

Target complexity: O(log n) per operation, O(n) space

Check your work:   python dsa.py test rq-fenwick
Stuck?             python dsa.py hint rq-fenwick
"""


class Fenwick:
    def __init__(self, n):
        pass

    def add(self, i, delta):
        pass

    def prefix_sum(self, i):
        pass

    def range_sum(self, l, r):
        pass
