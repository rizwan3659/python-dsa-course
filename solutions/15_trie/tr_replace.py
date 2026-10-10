"""Reference solution · tr-replace · Replace Words

Complexity: O(total characters)

Approach: Trie of roots; shortest match per word.
"""


def replace_words(roots, sentence):
    trie = {}
    for r in roots:
        node = trie
        for ch in r:
            node = node.setdefault(ch, {})
        node["$"] = r
    out = []
    for word in sentence.split():
        node, rep = trie, word
        for ch in word:
            if ch not in node:
                break
            node = node[ch]
            if "$" in node:              # shortest root found
                rep = node["$"]
                break
        out.append(rep)
    return " ".join(out)
