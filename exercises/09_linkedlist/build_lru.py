"""build-lru · Build an LRU Cache
Topic 9: Linked Lists · hard · Design / Build · build

A cache with a fixed capacity that evicts the least recently used key when
full. Both `get` and `put` must be O(1).

Requirements:
- `LRUCache(capacity)`
- `get(key)` → value or -1; a successful get makes the key most recently
  used
- `put(key, value)` inserts or updates (and marks as most recent); if over
  capacity, evict the least recently used key
- O(1) per operation: a dict for lookup + a doubly linked list for recency
  (or OrderedDict, if you can explain how it works)

Examples:
    the classic sequence
    put on an existing key refreshes it
    capacity 1

(1 more hidden test run when you check your work.)

Target complexity: O(1) per get/put

Check your work:   python dsa.py test build-lru
Stuck?             python dsa.py hint build-lru
"""


class Node:
    def __init__(self, key=None, val=None):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.map = {}                       # key -> Node
        self.head, self.tail = Node(), Node()   # sentinels: head side = most recent
        self.head.next, self.tail.prev = self.tail, self.head

    def get(self, key):
        pass

    def put(self, key, value):
        pass
