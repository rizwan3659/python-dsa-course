"""Reference solution · st-char-freq · Character Frequency

Complexity: O(n + k log k)

Approach: Counter + sorted with a tuple key.
"""


from collections import Counter

def char_frequency(s):
    return sorted(Counter(s).items(), key=lambda kv: (-kv[1], kv[0]))
