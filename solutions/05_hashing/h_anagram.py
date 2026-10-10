"""Reference solution · h-anagram · Valid Anagram

Complexity: O(n) time

Approach: Compare letter counts (Counter or a 26-slot array).
"""


from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)
