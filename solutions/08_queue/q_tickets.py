"""Reference solution · q-tickets · Time Needed to Buy Tickets

Complexity: O(n) time (direct count)

Approach: Simulate with a deque, or count directly in O(n).

Common mistakes:
- Simulating second by second without stopping when person k finishes.
- Counting people behind k for the full number of k’s tickets.

Follow-up challenge: Compute it in one pass without simulation.
"""


def time_required(tickets, k):
    total = 0
    for i, t in enumerate(tickets):
        if i <= k:
            total += min(t, tickets[k])
        else:
            total += min(t, tickets[k] - 1)
    return total
