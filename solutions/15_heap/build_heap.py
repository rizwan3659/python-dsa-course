"""Reference solution · build-heap · Build a Min-Heap

Complexity: O(log n) push/pop, O(1) peek

Approach: Complete binary tree in a list; each fix walks one root-to-leaf
path.
"""


class MinHeap:
    def __init__(self):
        self.data = []

    def push(self, x):
        self.data.append(x)
        self._up(len(self.data) - 1)

    def pop(self):
        if not self.data:
            raise IndexError("pop from empty heap")
        top = self.data[0]
        last = self.data.pop()
        if self.data:
            self.data[0] = last
            self._down(0)
        return top

    def peek(self):
        if not self.data:
            raise IndexError("peek at empty heap")
        return self.data[0]

    def __len__(self):
        return len(self.data)

    def _up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.data[i] >= self.data[parent]:
                break
            self.data[i], self.data[parent] = self.data[parent], self.data[i]
            i = parent

    def _down(self, i):
        n = len(self.data)
        while True:
            smallest = i
            for c in (2 * i + 1, 2 * i + 2):
                if c < n and self.data[c] < self.data[smallest]:
                    smallest = c
            if smallest == i:
                return
            self.data[i], self.data[smallest] = self.data[smallest], self.data[i]
            i = smallest
