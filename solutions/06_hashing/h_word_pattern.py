"""Reference solution · h-word-pattern · Word Pattern

Complexity: O(n) time

Approach: Two maps, or the distinct-count trick.

Common mistakes:
- Not checking that the number of words equals the pattern length.
- Using only one direction of mapping.

Follow-up challenge: Find all words from a list that match a pattern.
"""


def word_pattern(pattern, s):
    words = s.split()
    if len(words) != len(pattern):
        return False
    return len(set(pattern)) == len(set(words)) == len(set(zip(pattern, words)))
