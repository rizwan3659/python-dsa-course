"""Reference solution · hp-median · Find Median From a Data Stream

Complexity: O(log n) add, O(1) median

Approach: Two balanced heaps; the median sits at their tops.
"""


import heapq

class MedianFinder:
    def __init__(self):
        self.low = []      # max-heap (negated): the smaller half
        self.high = []     # min-heap: the larger half

    def add(self, num):
        heapq.heappush(self.low, -num)
        heapq.heappush(self.high, -heapq.heappop(self.low))   # move the largest of low up
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def median(self):
        if len(self.low) > len(self.high):
            return float(-self.low[0])
        return (-self.low[0] + self.high[0]) / 2
