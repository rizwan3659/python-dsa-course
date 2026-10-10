"""tr-d1 · Prefixes count as words
Topic 15: Trie · easy · Trie · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    search({"c": {"a": {"t": {"$": True}}}}, "ca")  ->  False
    search({"c": {"a": {"t": {"$": True}}}}, "cat")  ->  True

Check your work:   python dsa.py test tr-d1
Stuck?             python dsa.py hint tr-d1
"""


def search(root, word):
    node = root                  # nested dicts, "$" marks a word end
    for ch in word:
        if ch not in node:
            return False
        node = node[ch]
    return True
