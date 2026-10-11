"""Reference solution · q-reveal-cards · Reveal Cards in Increasing Order

Complexity: O(n log n) time

Approach: Queue of indexes simulates the order positions are revealed.

Common mistakes:
- Simulating forward instead of placing cards into the positions the process
  will visit.

Follow-up challenge: Given the order of revealing, reconstruct the deck for
"move two cards to the bottom" instead of one.
"""


from collections import deque

def deck_revealed_increasing(deck):
    n = len(deck)
    positions = deque(range(n))       # simulate the process on indexes
    result = [None] * n
    for card in sorted(deck):
        result[positions.popleft()] = card   # this position is revealed next
        if positions:
            positions.append(positions.popleft())
    return result
