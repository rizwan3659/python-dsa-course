"""Reference solution · bigo-first-repeat · First Repeating Character

Complexity: O(n) time

Approach: Set of seen characters; return the first one already present.
"""


def first_repeat(s):
    seen = set()
    for ch in s:
        if ch in seen:
            return ch
        seen.add(ch)
    return None
