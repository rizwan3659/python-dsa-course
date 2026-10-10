"""hp-d3 · Equal priorities crash
Topic 15: Heap / Priority Queue · medium · Heap / Top-K · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    schedule([(1, {"name": "a"}), (1, {"name": "b"}), (0, {"name": "c"})])  ->  ["c", "a", "b"]

Check your work:   python dsa.py test hp-d3
Stuck?             python dsa.py hint hp-d3
"""


import heapq

def schedule(jobs):
    h = []
    for priority, job in jobs:        # job is a dict
        heapq.heappush(h, (priority, job))
    return [heapq.heappop(h)[1]["name"] for _ in range(len(h))]
