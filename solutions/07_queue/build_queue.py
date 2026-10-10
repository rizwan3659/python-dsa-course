"""Reference solution · build-queue · Build a Queue

Complexity: Amortized O(1) per operation

Approach: Two stacks: each element is moved from inbox to outbox at most
once, so the cost is amortized O(1).
"""


class Queue:
    def __init__(self):
        self.inbox = []      # new items arrive here
        self.outbox = []     # items leave from here (reversed order)

    def enqueue(self, x):
        self.inbox.append(x)

    def _shift(self):
        if not self.outbox:
            while self.inbox:            # reverse once: oldest ends on top
                self.outbox.append(self.inbox.pop())

    def dequeue(self):
        self._shift()
        if not self.outbox:
            raise IndexError("dequeue from empty queue")
        return self.outbox.pop()

    def peek(self):
        self._shift()
        if not self.outbox:
            raise IndexError("peek at empty queue")
        return self.outbox[-1]

    def is_empty(self):
        return not self.inbox and not self.outbox

    def __len__(self):
        return len(self.inbox) + len(self.outbox)
