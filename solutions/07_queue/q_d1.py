"""Reference solution · q-d1 · A queue that is a stack
"""


from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, x):
        self.items.append(x)

    def dequeue(self):
        return self.items.popleft()
