"""Reference solution · py-group-len · Group Words by Length

Complexity: O(n) time

Approach: defaultdict(list) keyed by length.

Common mistakes:
- Overwriting the list for a length instead of appending to it.
- Sorting the words, which changes their original order.

Follow-up challenge: Return the groups sorted by length, longest first.
"""


from collections import defaultdict

def group_by_len(words):
    groups = defaultdict(list)
    for w in words:
        groups[len(w)].append(w)
    return dict(groups)
