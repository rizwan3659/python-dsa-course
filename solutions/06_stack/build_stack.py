"""Reference solution · build-stack · Build a Stack

Complexity: O(1) per operation

Approach: The end of the list is the top: append and pop are both O(1).
"""


class Stack:
    def __init__(self):
        self.items = []

    def push(self, x):
        self.items.append(x)          # the end of the list is the top

    def pop(self):
        if not self.items:
            raise IndexError("pop from empty stack")
        return self.items.pop()

    def peek(self):
        if not self.items:
            raise IndexError("peek at empty stack")
        return self.items[-1]

    def is_empty(self):
        return not self.items

    def __len__(self):
        return len(self.items)
