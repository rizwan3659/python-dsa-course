"""Reference solution · st-first-unique · First Unique Character

Complexity: O(n)

Approach: Counter, then scan.

Common mistakes:
- Using s.count() for each character: O(n²).
- Returning the character instead of its index.

Follow-up challenge: Answer the same question for a stream of characters
arriving one by one.
"""


from collections import Counter

def first_uniq_char(s):
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1
