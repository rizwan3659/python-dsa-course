"""Reference solution · hp-last-stone · Last Stone Weight

Complexity: O(n log n)

Approach: Max-heap via negation.
"""


import heapq

def last_stone_weight(stones):
    h = [-s for s in stones]
    heapq.heapify(h)
    while len(h) > 1:
        y = -heapq.heappop(h)
        x = -heapq.heappop(h)
        if y != x:
            heapq.heappush(h, -(y - x))
    return -h[0] if h else 0
