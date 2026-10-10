"""Reference solution · build-trie · Build a Trie

Complexity: O(L) per insert/search for a word of length L

Approach: One node per character; shared prefixes share nodes.
"""


class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.end = True

    def _walk(self, prefix):
        node = self.root
        for ch in prefix:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None

    def words_with_prefix(self, prefix):
        out = []
        def dfs(node, path):
            if node.end:
                out.append(path)
            for ch in sorted(node.children):
                dfs(node.children[ch], path + ch)
        start = self._walk(prefix)
        if start:
            dfs(start, prefix)
        return out
