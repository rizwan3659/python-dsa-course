"""Reference solution · py-count-vowels · Count Vowels

Complexity: O(n) time

Approach: Normalise case, then count matching characters.
"""


def count_vowels(s):
    return sum(1 for ch in s.lower() if ch in "aeiou")
