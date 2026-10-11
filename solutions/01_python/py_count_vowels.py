"""Reference solution · py-count-vowels · Count Vowels

Complexity: O(n) time

Approach: Normalise case, then count matching characters.

Common mistakes:
- Forgetting upper-case vowels.
- Counting "y" as a vowel.

Follow-up challenge: Return a dict with the count of each vowel separately.
"""


def count_vowels(s):
    return sum(1 for ch in s.lower() if ch in "aeiou")
