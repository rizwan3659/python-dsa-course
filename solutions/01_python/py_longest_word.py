"""Reference solution · py-longest-word · Longest Word

Complexity: O(n) time

Approach: split, then max with key=len.

Common mistakes:
- Using >= when comparing, which returns the last of tied words.
- Crashing on an empty sentence (max() of an empty list).

Follow-up challenge: Return all longest words, in order.
"""


def longest_word(sentence):
    words = sentence.split()
    return max(words, key=len) if words else ""
