"""Reference solution · s-min-stack · Min Stack

Complexity: O(1) per operation

Approach: Parallel stack of running minimums.

Common mistakes:
- Keeping a single min variable that breaks after popping the minimum.
- Calling min() on the whole stack: O(n).

Follow-up challenge: Use O(1) extra space per element by storing differences
from the minimum.
"""


class MinStack:
    def __init__(self):
        self.items = []
        self.mins = []

    def push(self, x):
        self.items.append(x)
        self.mins.append(x if not self.mins else min(x, self.mins[-1]))

    def pop(self):
        self.mins.pop()
        return self.items.pop()

    def top(self):
        return self.items[-1]

    def get_min(self):
        return self.mins[-1]
