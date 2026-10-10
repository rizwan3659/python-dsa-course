"""Reference solution · hp-meeting-rooms · Meeting Rooms II

Complexity: O(n log n)

Approach: Sort by start + min-heap of end times.
"""


import heapq

def min_rooms(intervals):
    ends = []                                  # end times of meetings in progress
    for start, end in sorted(intervals):
        if ends and ends[0] <= start:
            heapq.heapreplace(ends, end)       # reuse the room that frees up first
        else:
            heapq.heappush(ends, end)
    return len(ends)
