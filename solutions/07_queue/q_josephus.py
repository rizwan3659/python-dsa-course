"""Reference solution · q-josephus · Find the Winner of the Circular Game

Complexity: O(n · k) time

Approach: Deque simulation with rotate (O(n·k)); a math recurrence gives
O(n).
"""


from collections import deque

def find_winner(n, k):
    q = deque(range(1, n + 1))
    while len(q) > 1:
        q.rotate(-(k - 1))      # skip k - 1 friends
        q.popleft()             # the k-th leaves
    return q[0]
