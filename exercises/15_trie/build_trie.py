"""build-trie · Build a Trie
Topic 15: Trie · medium · Design / Build · build

Implement a prefix tree for lowercase words. Each node has a dict of
children and an end-of-word flag.

Requirements:
- `insert(word)`
- `search(word)` → True only for whole inserted words
- `starts_with(prefix)` → True if any word has this prefix
- `words_with_prefix(prefix)` → all inserted words with this prefix, sorted
  (autocomplete)

Examples:
    search finds whole words only
    starts_with
    autocomplete

Target complexity: O(L) per insert/search for a word of length L

Check your work:   python dsa.py test build-trie
Stuck?             python dsa.py hint build-trie
"""


class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        pass

    def _walk(self, prefix):
        """Return the node reached by following prefix, or None."""
        pass

    def search(self, word):
        pass

    def starts_with(self, prefix):
        pass

    def words_with_prefix(self, prefix):
        pass
