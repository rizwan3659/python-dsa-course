"""Reference solution · h-word-pattern · Word Pattern

Complexity: O(n) time

Approach: Two maps, or the distinct-count trick.
"""


def word_pattern(pattern, s):
    words = s.split()
    if len(words) != len(pattern):
        return False
    return len(set(pattern)) == len(set(words)) == len(set(zip(pattern, words)))
