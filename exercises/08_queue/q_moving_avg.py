"""q-moving-avg · Moving Average
Topic 8: Queue & Deque · easy · Queue / Deque

`MovingAverage(size)`; `next(val)` returns the average of the last `size`
values (or fewer at the start).

Examples:
    _t()  ->  [1.0, 5.5, 14 / 3, 6.0]
    (lambda m: [m.next(v) for v in (1, 10, 3, 5)])(MovingAverage(3))  ->  [1.0, 5.5, 4.666666666666667, 6.0]
    (lambda m: [m.next(v) for v in (4, 8)])(MovingAverage(1))  ->  [4.0, 8.0]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ size ≤ 1000
- up to 10^4 calls

Target complexity: O(1) per call

Check your work:   python dsa.py test q-moving-avg
Stuck?             python dsa.py hint q-moving-avg
"""


class MovingAverage:
    def __init__(self, size):
        pass

    def next(self, val):
        pass
