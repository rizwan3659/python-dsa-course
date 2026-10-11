"""Reference solution · py-word-freq · Word Frequency

Complexity: O(n) time

Approach: Split, then count with a dict (or collections.Counter).

Common mistakes:
- Not lower-casing words, so "The" and "the" count separately.
- Using text.split(" "), which creates empty words from double spaces.

Follow-up challenge: Return the three most common words, using
collections.Counter.most_common.
"""


def word_freq(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts
