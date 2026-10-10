"""Reference solution · hp-reorganize · Reorganize String

Complexity: O(n log 26)

Approach: Greedy with a max-heap and a one-step cooldown.
"""


import heapq
from collections import Counter

def reorganize(s):
    h = [(-n, ch) for ch, n in Counter(s).items()]
    heapq.heapify(h)
    out, prev = [], None
    while h:
        n, ch = heapq.heappop(h)          # most frequent letter that is allowed now
        out.append(ch)
        if prev:
            heapq.heappush(h, prev)       # the previous letter is allowed again
        prev = (n + 1, ch) if n + 1 < 0 else None
    return "".join(out) if len(out) == len(s) else ""
