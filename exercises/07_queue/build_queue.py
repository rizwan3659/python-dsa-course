"""build-queue · Build a Queue
Topic 7: Queue & Deque · easy · Design / Build · build

Implement a FIFO queue. Do not use `list.pop(0)` (it is O(n)). Use two lists
(an inbox and an outbox) or `collections.deque`.

Requirements:
- `enqueue(x)` adds at the back
- `dequeue()` removes and returns the front; raises `IndexError` if empty
- `peek()` returns the front; raises `IndexError` if empty
- `len(q)` and `is_empty()`
- Amortized O(1) per operation

Examples:
    enqueue 1, 2, 3; dequeue → 1; enqueue 4; dequeue → 2; peek → 3; len 2
    dequeue() on an empty queue raises IndexError
    empty again after one in, one out

(1 more hidden test run when you check your work.)

Target complexity: Amortized O(1) per operation

Check your work:   python dsa.py test build-queue
Stuck?             python dsa.py hint build-queue
"""


class Queue:
    def __init__(self):
        self.inbox = []
        self.outbox = []

    def enqueue(self, x):
        pass

    def dequeue(self):
        pass

    def peek(self):
        pass

    def is_empty(self):
        pass

    def __len__(self):
        pass
