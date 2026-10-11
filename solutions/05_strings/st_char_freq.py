"""Reference solution · st-char-freq · Character Frequency

Complexity: O(n + k log k)

Approach: Counter + sorted with a tuple key.

Common mistakes:
- Sorting by count only, so ties come out in random order.
- Sorting ascending instead of most frequent first.

Follow-up challenge: Return only the k most frequent characters with a heap.
"""


from collections import Counter

def char_frequency(s):
    return sorted(Counter(s).items(), key=lambda kv: (-kv[1], kv[0]))
