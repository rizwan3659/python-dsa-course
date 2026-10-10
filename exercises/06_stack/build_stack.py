"""build-stack · Build a Stack
Topic 6: Stack · easy · Design / Build · build

Implement a stack (last in, first out) on top of a Python list.

Requirements:
- `push(x)` adds x on top
- `pop()` removes and returns the top; raises `IndexError` if empty
- `peek()` returns the top without removing it; raises `IndexError` if empty
- `is_empty()` and `len(stack)`
- Every operation must be O(1)

Examples:
    push 1, 2, 3 → pop() is 3, peek() is 2, len is 2
    pop() on an empty stack raises IndexError
    peek() on an empty stack raises IndexError

(2 more hidden tests run when you check your work.)

Target complexity: O(1) per operation

Check your work:   python dsa.py test build-stack
Stuck?             python dsa.py hint build-stack
"""


class Stack:
    def __init__(self):
        self.items = []

    def push(self, x):
        pass

    def pop(self):
        pass

    def peek(self):
        pass

    def is_empty(self):
        pass

    def __len__(self):
        pass
