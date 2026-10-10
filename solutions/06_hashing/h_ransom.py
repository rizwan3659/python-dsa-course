"""Reference solution · h-ransom · Ransom Note

Complexity: O(n + m) time

Approach: Counter of the magazine must cover the note’s counts.
"""


from collections import Counter

def can_construct(note, magazine):
    have = Counter(magazine)
    for ch, n in Counter(note).items():
        if have[ch] < n:
            return False
    return True
