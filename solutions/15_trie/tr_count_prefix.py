"""Reference solution · tr-count-prefix · Count Words With a Prefix

Complexity: O(total characters + query length)

Approach: Trie with pass-through counts.
"""


def count_prefixes(words, queries):
    root = {}
    for w in words:
        node = root
        for ch in w:
            node = node.setdefault(ch, {"#": 0})
            node["#"] += 1               # how many words pass through this node
    out = []
    for q in queries:
        node = root
        for ch in q:
            node = node.get(ch)
            if node is None:
                break
        if node is None:
            out.append(0)
        else:
            out.append(node["#"] if q else len(words))
    return out
