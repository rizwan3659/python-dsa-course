"""Reference solution · h-group-anagrams · Group Anagrams

Complexity: O(n · k log k) time

Approach: Key = sorted letters (or a tuple of 26 counts); defaultdict(list).
"""


from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        groups["".join(sorted(w))].append(w)
    return list(groups.values())
