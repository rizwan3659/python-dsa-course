"""Project 8: Autocomplete Engine. See README.md."""
import heapq  # noqa: F401


class Node:
    def __init__(self):
        self.children = {}
        self.count = 0      # searches for the phrase that ends here


class Autocomplete:
    def __init__(self):
        self.root = Node()

    # ---- Milestone 1 ----
    def insert(self, phrase, count=1):
        pass  # TODO

    def frequency(self, phrase):
        pass  # TODO

    # ---- Milestone 2 ----
    def suggest(self, prefix, k=3):
        pass  # TODO

    # ---- Milestone 3 ----
    def record(self, phrase):
        pass  # TODO

    def typing(self, chars):
        pass  # TODO

    def remove(self, phrase):
        pass  # TODO
