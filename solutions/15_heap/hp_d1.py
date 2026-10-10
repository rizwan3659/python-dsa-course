"""Reference solution · hp-d1 · The “largest” is the smallest
"""


import heapq

def largest(nums):
    h = [-x for x in nums]
    heapq.heapify(h)
    return -heapq.heappop(h)
