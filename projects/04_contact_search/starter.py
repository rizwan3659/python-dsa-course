"""Project 4: Contact Search with a Trie. See README.md."""


class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0      # how many names pass through this node
        self.phone = None   # set when a name ends here


class ContactBook:
    def __init__(self):
        self.root = TrieNode()

    # ---- Milestone 1 ----
    def add(self, name, phone):
        pass  # TODO

    def phone(self, name):
        pass  # TODO

    def count_prefix(self, prefix):
        pass  # TODO

    # ---- Milestone 2 ----
    def search(self, prefix, limit=None):
        pass  # TODO: DFS in sorted order

    # ---- Milestone 3 ----
    def delete(self, name):
        pass  # TODO

    def search_number(self, digits):
        pass  # TODO
