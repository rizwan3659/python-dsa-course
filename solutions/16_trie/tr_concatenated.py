"""Reference solution · tr-concatenated · Concatenated Words

Complexity: O(n · L²) time where L is the maximum word length

Approach: Trie of all words + memoized word-break that counts pieces,
keeping words with at least two pieces.

Common mistakes:
- Counting a word as "concatenated" because it matches itself (one piece).
- No memoization: exponential on words like "aaaa…".
- Trying all pairs of words (misses three-word concatenations and is O(n²)).

Follow-up challenge: Return, for each concatenated word, one way to split
it.
"""


def concatenated_words(words):
    root = {}
    for w in words:                           # trie of all words; "#" marks a word end
        node = root
        for ch in w:
            node = node.setdefault(ch, {})
        node["#"] = True

    def pieces(w, start, memo):
        # the most words w[start:] can be split into (0 if it cannot be split)
        if start == len(w):
            return 0
        if start in memo:
            return memo[start]
        best, node = -1, root
        for i in range(start, len(w)):
            node = node.get(w[i])
            if node is None:
                break
            if "#" in node:
                rest = pieces(w, i + 1, memo)
                if rest >= 0:
                    best = max(best, rest + 1)
        memo[start] = best
        return best

    return sorted(w for w in words if pieces(w, 0, {}) >= 2)
