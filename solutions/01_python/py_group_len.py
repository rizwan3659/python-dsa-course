"""Reference solution · py-group-len · Group Words by Length

Complexity: O(n) time

Approach: defaultdict(list) keyed by length.
"""


from collections import defaultdict

def group_by_len(words):
    groups = defaultdict(list)
    for w in words:
        groups[len(w)].append(w)
    return dict(groups)
