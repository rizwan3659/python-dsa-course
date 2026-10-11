"""Reference solution · so-counting · Counting Sort

Complexity: O(n + k)

Approach: Count per value, then write values out in order.

Common mistakes:
- Allocating counts of size max(nums) when k is given (or vice versa).
- Comparing elements (that is not counting sort).

Follow-up challenge: Make it stable for sorting records by a small integer
key.
"""


def counting_sort(nums, k):
    count = [0] * (k + 1)
    for x in nums:
        count[x] += 1
    out = []
    for v in range(k + 1):
        out.extend([v] * count[v])
    return out
