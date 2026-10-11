"""Reference solution · q-moving-avg · Moving Average

Complexity: O(1) per call

Approach: Deque window + running sum.

Common mistakes:
- Recomputing sum() of the window each call: O(size).
- Dividing by size before the window is full.

Follow-up challenge: Return the moving median instead (two heaps).
"""


from collections import deque

class MovingAverage:
    def __init__(self, size):
        self.q = deque()
        self.size = size
        self.total = 0

    def next(self, val):
        self.q.append(val)
        self.total += val
        if len(self.q) > self.size:
            self.total -= self.q.popleft()
        return self.total / len(self.q)
