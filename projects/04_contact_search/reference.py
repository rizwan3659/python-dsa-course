"""Project 4: Contact Search with a Trie (reference implementation)."""


class TrieNode:
    def __init__(self):
        self.children: dict[str, "TrieNode"] = {}
        self.count = 0      # how many names pass through this node
        self.phone: str | None = None


class ContactBook:
    def __init__(self):
        self.root = TrieNode()
        self.numbers: dict[str, str] = {}      # name -> phone, for search_number

    def _walk(self, text: str) -> TrieNode | None:
        node = self.root
        for ch in text:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    # ---- Milestone 1 ----
    def add(self, name: str, phone: str) -> None:
        name = name.lower()
        if name in self.numbers:               # update: no new counts
            self._walk(name).phone = phone
            self.numbers[name] = phone
            return
        node = self.root
        node.count += 1
        for ch in name:
            node = node.children.setdefault(ch, TrieNode())
            node.count += 1
        node.phone = phone
        self.numbers[name] = phone

    def phone(self, name: str) -> str | None:
        return self.numbers.get(name.lower())

    def count_prefix(self, prefix: str) -> int:
        node = self._walk(prefix.lower())
        return node.count if node else 0

    # ---- Milestone 2 ----
    def search(self, prefix: str, limit: int | None = None) -> list[str]:
        prefix = prefix.lower()
        start = self._walk(prefix)
        found: list[str] = []
        if start is None:
            return found

        def dfs(node: TrieNode, path: str) -> bool:
            if limit is not None and len(found) >= limit:
                return True                    # enough results: stop everywhere
            if node.phone is not None:
                found.append(path)
            for ch in sorted(node.children):   # sorted children -> alphabetical output
                if dfs(node.children[ch], path + ch):
                    return True
            return limit is not None and len(found) >= limit

        dfs(start, prefix)
        return found[:limit] if limit is not None else found

    # ---- Milestone 3 ----
    def delete(self, name: str) -> bool:
        name = name.lower()
        if name not in self.numbers:
            return False
        del self.numbers[name]
        node = self.root
        node.count -= 1
        for ch in name:
            child = node.children[ch]
            child.count -= 1
            if child.count == 0:               # nobody else uses this branch
                del node.children[ch]
                return True
            node = child
        node.phone = None
        return True

    def search_number(self, digits: str) -> list[str]:
        return sorted(name for name, phone in self.numbers.items() if digits in phone)
