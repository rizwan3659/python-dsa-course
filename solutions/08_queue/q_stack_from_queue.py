"""Reference solution · q-stack-from-queue · Stack Using a Queue

Complexity: push O(n), pop O(1)

Approach: Rotate on push so the newest item is always at the front.

Common mistakes:
- Using list.pop() (that is already a stack).
- Rotating on both push and pop, doing twice the work.

Follow-up challenge: Now build a queue from two stacks, with amortised O(1)
operations.
"""


from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        self.q.append(x)
        for _ in range(len(self.q) - 1):    # rotate so x is at the front
            self.q.append(self.q.popleft())

    def pop(self):
        return self.q.popleft()

    def top(self):
        return self.q[0]

    def empty(self):
        return not self.q
