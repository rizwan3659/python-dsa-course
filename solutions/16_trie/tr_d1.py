"""Reference solution · tr-d1 · Prefixes count as words
"""


def search(root, word):
    node = root
    for ch in word:
        if ch not in node:
            return False
        node = node[ch]
    return "$" in node
