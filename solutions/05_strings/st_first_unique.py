"""Reference solution · st-first-unique · First Unique Character

Complexity: O(n)

Approach: Counter, then scan.
"""


from collections import Counter

def first_uniq_char(s):
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1
