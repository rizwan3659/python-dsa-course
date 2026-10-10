"""Reference solution · q-recent-counter · Number of Recent Calls

Complexity: O(1) amortized per ping

Approach: Deque of timestamps; drop expired ones from the left.
"""


from collections import deque

class RecentCounter:
    def __init__(self):
        self.q = deque()

    def ping(self, t):
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)
