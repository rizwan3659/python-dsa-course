"""Reference solution · pt-ipo · IPO (maximise capital)

Complexity: O(n log n + k log n) time

Approach: Sort + max-heap: greedy choice of the best affordable project, k
times.

Common mistakes:
- Re-scanning all projects every round: O(n · k).
- Forgetting to stop when nothing is affordable.

Follow-up challenge: Why is the greedy choice safe? Give an exchange
argument.
"""


import heapq


def find_max_capital(k, w, profits, capital):
    projects = sorted(zip(capital, profits))   # cheapest to start first
    available = []                             # max-heap (negated) of affordable profits
    i = 0
    for _ in range(k):
        while i < len(projects) and projects[i][0] <= w:
            heapq.heappush(available, -projects[i][1])
            i += 1
        if not available:
            break                              # nothing affordable any more
        w -= heapq.heappop(available)          # greedy: the most profitable affordable project
    return w
