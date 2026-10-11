"""Reference solution · q-first-negative · First Negative in Every Window

Complexity: O(n) time

Approach: Deque of negative indexes for the current window.

Common mistakes:
- Scanning each window from the start: O(n · k).
- Not removing indexes that have left the window.

Follow-up challenge: Return the last negative of every window instead.
"""


from collections import deque

def first_negatives(nums, k):
    negs = deque()                 # indexes of negatives in the window
    out = []
    for i, x in enumerate(nums):
        if x < 0:
            negs.append(i)
        if negs and negs[0] <= i - k:
            negs.popleft()
        if i >= k - 1:
            out.append(nums[negs[0]] if negs else 0)
    return out
