"""Reference solution · st-reverse-words · Reverse Words in a String

Complexity: O(n)

Approach: split, reverse, join.

Common mistakes:
- Using split(" "), which keeps empty strings from repeated spaces.
- Reversing the characters instead of the words.

Follow-up challenge: Do it in place on a list of characters with O(1) extra
space.
"""


def reverse_words(s):
    return " ".join(reversed(s.split()))
