"""Reference solution · h-freq-sort · Sort Characters by Frequency

Complexity: O(n + k log k) for k distinct characters

Approach: Counter, sort by (−count, char), rebuild with ch * count.
"""


from collections import Counter

def frequency_sort(s):
    counts = Counter(s)
    order = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    return "".join(ch * n for ch, n in order)
