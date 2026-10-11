"""q-stack-from-queue · Stack Using a Queue
Topic 8: Queue & Deque · easy · Design / Build

Implement a stack (`push`, `pop`, `top`, `empty`) using only queue
operations on a deque: `append`, `popleft`, `len`, `q[0]`.

Examples:
    _t()  ->  [3, 3, 2, False, 1, True]
    (lambda s: (s.push(1), s.push(2), s.top(), s.pop(), s.top(), s.empty(), s.pop(), s.empty()))(MyStack())[2:]  ->  (2, 2, 1, False, 1, True)
    (lambda s: (s.push(7), s.push(8), s.push(9), s.pop(), s.pop(), s.pop()))(MyStack())[3:]  ->  (9, 8, 7)

(1 more hidden test run when you check your work.)

Constraints:
- up to 100 operations
- pop and top are only called on a non-empty stack

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
