"""build-dll · Build a Doubly Linked List
Topic 9: Linked Lists · medium · Design / Build · build

Implement a doubly linked list with sentinel head and tail nodes, so every
insert and delete looks the same.

Requirements:
- `push_front(x)`, `push_back(x)` in O(1)
- `pop_front()`, `pop_back()` in O(1); raise `IndexError` if empty
- `to_list()` walks next pointers; `to_list_reversed()` walks prev pointers
- `len(dll)`

Examples:
    both directions agree
    pop from both ends
    back to empty

Target complexity: O(1) for all end operations

Check your work:   python dsa.py test build-dll
Stuck?             python dsa.py hint build-dll
"""


class Node:
    def __init__(self, val=None):
        self.val = val
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = Node()      # sentinel before the first real node
        self.tail = Node()      # sentinel after the last real node
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def _insert_between(self, node, before, after):
        pass

    def _unlink(self, node):
        pass

    def push_front(self, x):
        pass

    def push_back(self, x):
        pass

    def pop_front(self):
        pass

    def pop_back(self):
        pass

    def to_list(self):
        pass

    def to_list_reversed(self):
        pass

    def __len__(self):
        return self.size
