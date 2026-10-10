"""Reference solution · so-counting · Counting Sort

Complexity: O(n + k)

Approach: Count per value, then write values out in order.
"""


def counting_sort(nums, k):
    count = [0] * (k + 1)
    for x in nums:
        count[x] += 1
    out = []
    for v in range(k + 1):
        out.extend([v] * count[v])
    return out
