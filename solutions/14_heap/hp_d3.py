"""Reference solution · hp-d3 · Equal priorities crash
"""


import heapq
from itertools import count

def schedule(jobs):
    h, tie = [], count()
    for priority, job in jobs:
        heapq.heappush(h, (priority, next(tie), job))
    return [heapq.heappop(h)[2]["name"] for _ in range(len(h))]
