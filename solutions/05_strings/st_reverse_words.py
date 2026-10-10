"""Reference solution · st-reverse-words · Reverse Words in a String

Complexity: O(n)

Approach: split, reverse, join.
"""


def reverse_words(s):
    return " ".join(reversed(s.split()))
