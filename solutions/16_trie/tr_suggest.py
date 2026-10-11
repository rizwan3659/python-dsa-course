"""Reference solution · tr-suggest · Search Suggestions

Complexity: O(total characters)

Approach: Trie with up to 3 cached suggestions per node.

Common mistakes:
- Returning more than three products.
- Not sorting the products first.

Follow-up challenge: Rank suggestions by popularity
(projects/08_autocomplete).
"""


def suggested_products(products, search_word):
    root = {}
    for p in sorted(products):
        node = root
        for ch in p:
            node = node.setdefault(ch, {"#": []})
            if len(node["#"]) < 3:
                node["#"].append(p)      # sorted insert order keeps the 3 smallest
    out, node = [], root
    for ch in search_word:
        node = node.get(ch) if node else None
        out.append(node["#"] if node else [])
    return out
