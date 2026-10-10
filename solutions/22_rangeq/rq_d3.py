"""Reference solution · rq-d3 · Range sum misses the last element
"""


def build(nums):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return prefix

def range_sum(prefix, l, r):          # inclusive l..r
    return prefix[r + 1] - prefix[l]
