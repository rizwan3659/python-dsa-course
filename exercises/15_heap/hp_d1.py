"""hp-d1 · The “largest” is the smallest
Topic 15: Heap / Priority Queue · easy · Heap / Top-K · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    largest([3, 9, 2])  ->  9

Check your work:   python dsa.py test hp-d1
Stuck?             python dsa.py hint hp-d1
"""


import heapq

def largest(nums):
    h = list(nums)
    heapq.heapify(h)
    return heapq.heappop(h)
