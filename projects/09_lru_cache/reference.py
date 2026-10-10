"""Project 9: LRU Cache (reference implementation): dict + doubly linked list."""


class Node:
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.prev: "Node | None" = None
        self.next: "Node | None" = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.map: dict = {}
        self.head, self.tail = Node(), Node()    # dummies: head.next is the most recent
        self.head.next, self.tail.prev = self.tail, self.head
        self.hits = self.misses = self.evictions = 0

    def _unlink(self, node: Node) -> None:
        node.prev.next, node.next.prev = node.next, node.prev

    def _push_front(self, node: Node) -> None:
        node.prev, node.next = self.head, self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _evict_extra(self) -> None:
        while len(self.map) > self.capacity:
            lru = self.tail.prev                 # least recently used
            self._unlink(lru)
            del self.map[lru.key]
            self.evictions += 1

    # ---- Milestone 1 ----
    def get(self, key):
        node = self.map.get(key)
        if node is None:
            self.misses += 1
            return None
        self.hits += 1
        self._unlink(node)
        self._push_front(node)
        return node.value

    def put(self, key, value) -> None:
        node = self.map.get(key)
        if node is not None:
            node.value = value
            self._unlink(node)
        else:
            node = Node(key, value)
            self.map[key] = node
        self._push_front(node)
        self._evict_extra()

    def __len__(self) -> int:
        return len(self.map)

    def __contains__(self, key) -> bool:
        return key in self.map

    # ---- Milestone 2 ----
    def keys(self) -> list:
        out, node = [], self.head.next
        while node is not self.tail:
            out.append(node.key)
            node = node.next
        return out

    # ---- Milestone 3 ----
    def stats(self) -> dict:
        return {"hits": self.hits, "misses": self.misses, "evictions": self.evictions}

    def resize(self, capacity: int) -> None:
        self.capacity = capacity
        self._evict_extra()
