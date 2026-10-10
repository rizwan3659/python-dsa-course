"""q-d2 · Rear of a circular queue
Topic 7: Queue & Deque · medium · Queue / Deque · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    _t()  ->  8

Check your work:   python dsa.py test q-d2
Stuck?             python dsa.py hint q-d2
"""


class CircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = self.count = 0

    def enqueue(self, x):
        self.data[(self.head + self.count) % len(self.data)] = x
        self.count += 1

    def rear(self):
        return self.data[(self.head + self.count) % len(self.data)]
