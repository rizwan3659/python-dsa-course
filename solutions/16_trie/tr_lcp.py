"""Reference solution · tr-lcp · Longest Common Prefix

Complexity: O(total characters)

Approach: Column scan (or a single-branch walk in a trie).

Common mistakes:
- Crashing on an empty list or an empty word.
- Comparing only the first two words.

Follow-up challenge: Find the longest prefix shared by at least half of the
words.
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
