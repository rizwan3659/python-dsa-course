"""build-heap · Build a Min-Heap
Topic 15: Heap / Priority Queue · medium · Design / Build · build

Implement a binary min-heap stored in a list: the children of index i are at
2i + 1 and 2i + 2, its parent at (i − 1) // 2. Do not use heapq.

Requirements:
- `push(x)`: append, then bubble up
- `pop()`: remove and return the minimum (move the last item to the root,
  then bubble down); raise `IndexError` if empty
- `peek()` → minimum; `IndexError` if empty
- `len(h)`
- push and pop in O(log n)

Examples:
    push six numbers, pop them in order
    empty heap
    3,000 random numbers come out sorted

(1 more hidden test run when you check your work.)

Target complexity: O(log n) push/pop, O(1) peek

Check your work:   python dsa.py test build-heap
Stuck?             python dsa.py hint build-heap
"""


class MinHeap:
    def __init__(self):
        self.data = []

    def push(self, x):
        pass

    def pop(self):
        pass

    def peek(self):
        pass

    def __len__(self):
        return len(self.data)

    def _up(self, i):
        pass

    def _down(self, i):
        pass
