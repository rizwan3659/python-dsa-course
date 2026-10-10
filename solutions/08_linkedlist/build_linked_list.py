"""Reference solution · build-linked-list · Build a Singly Linked List

Complexity: push_front/pop_front O(1); push_back, find, remove O(n)

Approach: Pointer manipulation with a dummy node for deletion and three
pointers for reversal.
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
        self.head = Node(x, self.head)
        self.size += 1

    def push_back(self, x):
        node = Node(x)
        if self.head is None:
            self.head = node
        else:
            cur = self.head
            while cur.next:
                cur = cur.next
            cur.next = node
        self.size += 1

    def pop_front(self):
        if self.head is None:
            raise IndexError("pop from empty list")
        val = self.head.val
        self.head = self.head.next
        self.size -= 1
        return val

    def find(self, x):
        cur = self.head
        while cur:
            if cur.val == x:
                return True
            cur = cur.next
        return False

    def remove(self, x):
        dummy = Node(None, self.head)     # dummy node: no special case for the head
        prev = dummy
        while prev.next:
            if prev.next.val == x:
                prev.next = prev.next.next
                self.head = dummy.next
                self.size -= 1
                return True
            prev = prev.next
        return False

    def reverse(self):
        prev, cur = None, self.head
        while cur:
            nxt = cur.next
            cur.next = prev
            prev, cur = cur, nxt
        self.head = prev

    def to_list(self):
        out, cur = [], self.head
        while cur:
            out.append(cur.val)
            cur = cur.next
        return out

    def __len__(self):
        return self.size
