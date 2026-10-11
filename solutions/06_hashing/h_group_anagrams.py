"""Reference solution · h-group-anagrams · Group Anagrams

Complexity: O(n · k log k) time

Approach: Key = sorted letters (or a tuple of 26 counts); defaultdict(list).

Common mistakes:
- Using a list as a dict key (lists are not hashable; use a tuple or a
  sorted string).
- Comparing every pair of words: O(n² · L).

Follow-up challenge: Use a 26-letter count tuple as the key instead of
sorting (O(L) per word).
"""


from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        groups["".join(sorted(w))].append(w)
    return list(groups.values())
