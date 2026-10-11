"""q-recent-counter · Number of Recent Calls
Topic 8: Queue & Deque · easy · Queue / Deque

Write `RecentCounter` with `ping(t)` that records a call at time t (ms,
strictly increasing) and returns how many calls happened in the last 3000
ms, i.e. in `[t - 3000, t]`.

Examples:
    _t()  ->  [1, 2, 3, 3, 1]
    (lambda c: [c.ping(t) for t in (1, 100, 3001, 3002)])(RecentCounter())  ->  [1, 2, 3, 3]
    (lambda c: [c.ping(t) for t in (5, 10000, 20000)])(RecentCounter())  ->  [1, 1, 1]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ t ≤ 10^9, strictly increasing
- up to 10^4 calls

Target complexity: O(1) amortized per ping

Check your work:   python dsa.py test q-recent-counter
Stuck?             python dsa.py hint q-recent-counter
"""


class RecentCounter:
    def __init__(self):
        pass

    def ping(self, t):
        pass
