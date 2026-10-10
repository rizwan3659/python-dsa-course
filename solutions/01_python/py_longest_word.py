"""Reference solution · py-longest-word · Longest Word

Complexity: O(n) time

Approach: split, then max with key=len.
"""


def longest_word(sentence):
    words = sentence.split()
    return max(words, key=len) if words else ""
