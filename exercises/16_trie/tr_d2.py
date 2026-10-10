"""tr-d2 · Inserting erases words
Topic 16: Trie · medium · Trie · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    _t()  ->  True

Check your work:   python dsa.py test tr-d2
Stuck?             python dsa.py hint tr-d2
"""


def insert(root, word):
    node = root
    for ch in word:
        node[ch] = {}
        node = node[ch]
    node["$"] = True
