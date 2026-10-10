"""Reference solution · q-tickets · Time Needed to Buy Tickets

Complexity: O(n) time (direct count)

Approach: Simulate with a deque, or count directly in O(n).
"""


def time_required(tickets, k):
    total = 0
    for i, t in enumerate(tickets):
        if i <= k:
            total += min(t, tickets[k])
        else:
            total += min(t, tickets[k] - 1)
    return total
