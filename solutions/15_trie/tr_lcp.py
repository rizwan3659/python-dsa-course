"""Reference solution · tr-lcp · Longest Common Prefix

Complexity: O(total characters)

Approach: Column scan (or a single-branch walk in a trie).
"""


def longest_common_prefix(words):
    if not words:
        return ""
    prefix = ""
    for chars in zip(*words):            # column by column
        if len(set(chars)) != 1:
            break
        prefix += chars[0]
    return prefix
