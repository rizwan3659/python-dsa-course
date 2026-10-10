"""q-d1 · A queue that is a stack
Topic 7: Queue & Deque · easy · Queue / Deque · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    _t()  ->  1

Check your work:   python dsa.py test q-d1
Stuck?             python dsa.py hint q-d1
"""


class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, x):
        self.items.append(x)

    def dequeue(self):
        return self.items.pop()
