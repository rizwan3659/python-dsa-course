"""Reference solution · q-interleave · Interleave the Two Halves

Complexity: O(n) time

Approach: Split into two deques and alternate popleft.

Common mistakes:
- Splitting at the wrong index for the halves.
- Popping from the front of a list (O(n) each time) instead of a deque.

Follow-up challenge: Interleave in place with O(1) extra space.
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
