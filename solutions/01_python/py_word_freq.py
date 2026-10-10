"""Reference solution · py-word-freq · Word Frequency

Complexity: O(n) time

Approach: Split, then count with a dict (or collections.Counter).
"""


def word_freq(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts
