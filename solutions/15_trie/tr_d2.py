"""Reference solution · tr-d2 · Inserting erases words
"""


def insert(root, word):
    node = root
    for ch in word:
        node = node.setdefault(ch, {})
    node["$"] = True
