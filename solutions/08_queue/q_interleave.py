"""Reference solution · q-interleave · Interleave the Two Halves

Complexity: O(n) time

Approach: Split into two deques and alternate popleft.
"""


from collections import deque

def interleave(items):
    half = len(items) // 2
    a, b = deque(items[:half]), deque(items[half:])
    out = []
    while a:
        out.append(a.popleft())
        out.append(b.popleft())
    return out
