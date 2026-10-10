"""Reference solution · tr-longest-word · Longest Word Built Letter by Letter

Complexity: O(total characters · L)

Approach: Check prefixes (set or trie).
"""


def longest_word(words):
    have = set(words)
    best = ""
    for w in sorted(words):
        if len(w) > len(best) and all(w[:i] in have for i in range(1, len(w))):
            best = w
    return best
