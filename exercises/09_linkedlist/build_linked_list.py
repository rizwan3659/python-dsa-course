"""build-linked-list · Build a Singly Linked List
Topic 9: Linked Lists · medium · Design / Build · build

Implement a singly linked list with a `head` pointer and a size counter.

Requirements:
- `push_front(x)` and `push_back(x)`
- `pop_front()` returns the first value; raises `IndexError` if empty
- `find(x)` → True/False
- `remove(x)` deletes the first node holding x → True, or False if absent
- `reverse()` in place (no new nodes)
- `to_list()` and `len(ll)`

Examples:
    push_back 2, push_front 1, push_back 3
    remove first match, missing value, the head
    reverse, then pop_front and find

(1 more hidden test run when you check your work.)

Target complexity: push_front/pop_front O(1); push_back, find, remove O(n)

Check your work:   python dsa.py test build-linked-list
Stuck?             python dsa.py hint build-linked-list
"""


class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def push_front(self, x):
        pass

    def push_back(self, x):
        pass

    def pop_front(self):
        pass

    def find(self, x):
        pass

    def remove(self, x):
        pass

    def reverse(self):
        pass

    def to_list(self):
        pass

    def __len__(self):
        return self.size
