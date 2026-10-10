"""q-stack-from-queue · Stack Using a Queue
Topic 7: Queue & Deque · easy · Design / Build

Implement a stack (`push`, `pop`, `top`, `empty`) using only queue
operations on a deque: `append`, `popleft`, `len`, `q[0]`.

Examples:
    _t()  ->  [3, 3, 2, False, 1, True]

Target complexity: push O(n), pop O(1)

Check your work:   python dsa.py test q-stack-from-queue
Stuck?             python dsa.py hint q-stack-from-queue
"""


from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        pass

    def pop(self):
        pass

    def top(self):
        pass

    def empty(self):
        pass
