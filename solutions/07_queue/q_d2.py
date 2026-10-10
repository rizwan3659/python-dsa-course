"""Reference solution · q-d2 · Rear of a circular queue
"""


class CircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = self.count = 0

    def enqueue(self, x):
        self.data[(self.head + self.count) % len(self.data)] = x
        self.count += 1

    def rear(self):
        return self.data[(self.head + self.count - 1) % len(self.data)]
