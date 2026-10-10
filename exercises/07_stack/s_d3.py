"""s-d3 · Min stack forgets
Topic 7: Stack · medium · Design / Build · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    _t()  ->  3

Check your work:   python dsa.py test s-d3
Stuck?             python dsa.py hint s-d3
"""


class MinStack:
    def __init__(self):
        self.items = []
        self.min = None

    def push(self, x):
        self.items.append(x)
        if self.min is None or x < self.min:
            self.min = x

    def pop(self):
        return self.items.pop()

    def get_min(self):
        return self.min
