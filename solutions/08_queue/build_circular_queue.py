"""Reference solution · build-circular-queue · Build a Circular Queue

Complexity: O(1) per operation, O(k) space

Approach: Head index + count; positions wrap with modulo.
"""


class CircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = 0
        self.count = 0

    def enqueue(self, x):
        if self.is_full():
            return False
        tail = (self.head + self.count) % len(self.data)
        self.data[tail] = x
        self.count += 1
        return True

    def dequeue(self):
        if self.is_empty():
            return False
        self.head = (self.head + 1) % len(self.data)
        self.count -= 1
        return True

    def front(self):
        return -1 if self.is_empty() else self.data[self.head]

    def rear(self):
        if self.is_empty():
            return -1
        return self.data[(self.head + self.count - 1) % len(self.data)]

    def is_empty(self):
        return self.count == 0

    def is_full(self):
        return self.count == len(self.data)
