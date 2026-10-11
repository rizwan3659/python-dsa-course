"""Reference solution · hp-ropes · Minimum Cost to Connect Ropes

Complexity: O(n log n)

Approach: Greedy with a min-heap (Huffman-style).

Common mistakes:
- Joining the ropes in the given order.
- Forgetting that a single rope costs 0.

Follow-up challenge: Prove why joining the two shortest first is optimal.
"""


import heapq

def connect_ropes(ropes):
    h = list(ropes)
    heapq.heapify(h)
    cost = 0
    while len(h) > 1:
        a = heapq.heappop(h)
        b = heapq.heappop(h)
        cost += a + b
        heapq.heappush(h, a + b)
    return cost
