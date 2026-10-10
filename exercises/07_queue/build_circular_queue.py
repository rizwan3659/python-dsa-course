"""build-circular-queue · Build a Circular Queue
Topic 7: Queue & Deque · medium · Design / Build · build

Implement a fixed-capacity queue in a list of size k that wraps around: when
the back reaches the end of the list, it continues at index 0.

Requirements:
- `CircularQueue(k)` allocates `[None] * k` once
- `enqueue(x)` → True, or False if full
- `dequeue()` → True, or False if empty
- `front()` and `rear()` → the value, or -1 if empty
- `is_empty()`, `is_full()`
- Never shift elements: use a head index and a count with % k

Examples:
    k = 3: fill, overflow, wrap around
    empty queue behaviour
    wraps many times without growing the list

Target complexity: O(1) per operation, O(k) space

Check your work:   python dsa.py test build-circular-queue
Stuck?             python dsa.py hint build-circular-queue
"""


class CircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = 0      # index of the front element
        self.count = 0

    def enqueue(self, x):
        pass

    def dequeue(self):
        pass

    def front(self):
        pass

    def rear(self):
        pass

    def is_empty(self):
        pass

    def is_full(self):
        pass
