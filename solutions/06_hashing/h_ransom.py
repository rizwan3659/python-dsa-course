"""Reference solution · h-ransom · Ransom Note

Complexity: O(n + m) time

Approach: Counter of the magazine must cover the note’s counts.

Common mistakes:
- Using magazine.count(ch) for each letter of the note: O(n · m).
- Checking that letters exist without checking counts.

Follow-up challenge: Return which letters are missing and how many.
"""


from collections import Counter

def can_construct(note, magazine):
    have = Counter(magazine)
    for ch, n in Counter(note).items():
        if have[ch] < n:
            return False
    return True
