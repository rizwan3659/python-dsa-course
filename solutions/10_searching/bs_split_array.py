"""Reference solution · bs-split-array · Split Array Largest Sum

Complexity: O(n log(sum))

Approach: Binary search on the answer + greedy feasibility (same shape as
shipping capacity).
"""


def split_array(nums, k):
    def parts_needed(limit):
        parts, total = 1, 0
        for x in nums:
            if total + x > limit:
                parts += 1
                total = 0
            total += x
        return parts
    lo, hi = max(nums), sum(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if parts_needed(mid) <= k:
            hi = mid
        else:
            lo = mid + 1
    return lo
