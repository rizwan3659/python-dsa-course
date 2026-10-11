"""Reference solution · bigo-first-repeat · First Repeating Character

Complexity: O(n) time

Approach: Set of seen characters; return the first one already present.

Common mistakes:
- Returning the first character that appears twice anywhere ("abcbad" gives
  "a" instead of "b").
- Using s.count() for every character: O(n²).

Follow-up challenge: Return the first character that never repeats.
"""


def first_repeat(s):
    seen = set()
    for ch in s:
        if ch in seen:
            return ch
        seen.add(ch)
    return None
