"""Reference solution · s-d3 · Min stack forgets
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

    def get_min(self):
        return self.mins[-1]
