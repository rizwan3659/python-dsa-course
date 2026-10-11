"""Reference solution · h-anagram · Valid Anagram

Complexity: O(n) time

Approach: Compare letter counts (Counter or a 26-slot array).

Common mistakes:
- Comparing sets, which ignores counts ("aab" vs "abb").
- Sorting both strings is correct but O(n log n).

Follow-up challenge: What if the strings contain Unicode characters?
"""


from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)
