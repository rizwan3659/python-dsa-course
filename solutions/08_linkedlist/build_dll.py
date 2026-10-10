"""Reference solution · build-dll · Build a Doubly Linked List

Complexity: O(1) for all end operations

Approach: Sentinel nodes remove all the “is the list empty / is this the
head?” special cases.
"""


class Node:
    def __init__(self, val=None):
        self.val = val
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def _insert_between(self, node, before, after):
        node.prev, node.next = before, after
        before.next = node
        after.prev = node
        self.size += 1

    def _unlink(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev
        self.size -= 1
        return node.val

    def push_front(self, x):
        self._insert_between(Node(x), self.head, self.head.next)

    def push_back(self, x):
        self._insert_between(Node(x), self.tail.prev, self.tail)

    def pop_front(self):
        if self.size == 0:
            raise IndexError("pop from empty list")
        return self._unlink(self.head.next)

    def pop_back(self):
        if self.size == 0:
            raise IndexError("pop from empty list")
        return self._unlink(self.tail.prev)

    def to_list(self):
        out, cur = [], self.head.next
        while cur is not self.tail:
            out.append(cur.val)
            cur = cur.next
        return out

    def to_list_reversed(self):
        out, cur = [], self.tail.prev
        while cur is not self.head:
            out.append(cur.val)
            cur = cur.prev
        return out

    def __len__(self):
        return self.size
