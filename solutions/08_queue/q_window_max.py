"""Reference solution · q-window-max · Sliding Window Maximum

Complexity: O(n) time, O(k) space

Approach: Monotonic decreasing deque of indexes; the front is the max.
"""


from collections import deque

def max_sliding_window(nums, k):
    dq, out = deque(), []          # indexes, values decreasing
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(nums[dq[0]])
    return out
