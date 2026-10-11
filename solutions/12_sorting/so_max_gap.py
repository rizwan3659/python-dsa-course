"""Reference solution · so-max-gap · Maximum Gap

Complexity: O(n) time, O(n) space

Approach: Pigeonhole bucketing: track min and max per bucket and scan the
buckets.

Common mistakes:
- Comparing neighbours in the original (unsorted) order.
- A bucket width of 0 when all numbers are close (use max(1, …)).
- Looking for the gap inside a bucket instead of between buckets.

Follow-up challenge: Solve it with radix sort and compare the two O(n)
approaches.
"""


def maximum_gap(nums):
    n = len(nums)
    if n < 2:
        return 0
    lo, hi = min(nums), max(nums)
    if lo == hi:
        return 0
    size = max(1, (hi - lo) // (n - 1))          # the answer is at least this big
    count = (hi - lo) // size + 1
    low = [None] * count
    high = [None] * count
    for x in nums:
        b = (x - lo) // size
        low[b] = x if low[b] is None else min(low[b], x)
        high[b] = x if high[b] is None else max(high[b], x)
    best, previous = 0, lo
    for b in range(count):                       # the gap lives between buckets
        if low[b] is None:
            continue
        best = max(best, low[b] - previous)
        previous = high[b]
    return best
