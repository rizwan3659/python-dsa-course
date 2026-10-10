"""Reference solution · bst-almost-dup · Contains Nearby Almost Duplicate

Complexity: O(n) time, O(k) space

Approach: Sliding window of buckets keyed by x // (t + 1).

Common mistakes:
- Using int(x / width), which rounds negative numbers towards zero and
  merges buckets −1 and 0.
- Forgetting to remove the value that leaves the window.

Follow-up challenge: Solve it with a sorted list and bisect in O(n log k),
then compare.
"""


def almost_duplicate(nums, k, t):
    width = t + 1
    buckets = {}                          # bucket id -> value, only for the last k indexes
    for i, x in enumerate(nums):
        b = x // width                    # floor division works for negatives too
        if b in buckets:
            return True                   # same bucket: difference <= t
        for nb in (b - 1, b + 1):         # neighbours may also be close enough
            if nb in buckets and abs(buckets[nb] - x) <= t:
                return True
        buckets[b] = x
        if i >= k:                        # slide the window: forget nums[i - k]
            del buckets[nums[i - k] // width]
    return False
