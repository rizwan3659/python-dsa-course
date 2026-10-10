"""q-d3 · Two stacks, wrong order
Topic 7: Queue & Deque · medium · Design / Build · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    _t()  ->  [1, 2]

Check your work:   python dsa.py test q-d3
Stuck?             python dsa.py hint q-d3
"""


class Queue:
    def __init__(self):
        self.inbox, self.outbox = [], []

    def enqueue(self, x):
        self.inbox.append(x)

    def dequeue(self):
        while self.inbox:
            self.outbox.append(self.inbox.pop())
        return self.outbox.pop()
