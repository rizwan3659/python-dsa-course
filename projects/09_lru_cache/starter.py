"""Project 9: LRU Cache. See README.md. Do not use OrderedDict or functools.lru_cache."""


class Node:
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        # TODO: a dict key -> Node, plus dummy head and tail nodes

    # ---- Milestone 1 ----
    def get(self, key):
        pass  # TODO

    def put(self, key, value):
        pass  # TODO

    def __len__(self):
        return 0  # TODO

    def __contains__(self, key):
        return False  # TODO

    # ---- Milestone 2 ----
    def keys(self):
        pass  # TODO: most recent first

    # ---- Milestone 3 ----
    def stats(self):
        pass  # TODO

    def resize(self, capacity):
        pass  # TODO
