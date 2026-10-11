"""Reference solution · bs-median-two · Median of Two Sorted Arrays

Complexity: O(log min(n, m))

Approach: Binary search the partition of the shorter array.

Common mistakes:
- Merging both lists (O(n + m)), which misses the goal.
- Binary searching the longer list, which causes index errors.

Follow-up challenge: Find the k-th smallest of the two lists.
"""


def find_median(a, b):
    if len(a) > len(b):
        a, b = b, a                       # binary search the shorter list
    n, m = len(a), len(b)
    half = (n + m + 1) // 2
    lo, hi = 0, n
    while lo <= hi:
        i = (lo + hi) // 2                # take i from a, half - i from b
        j = half - i
        a_left = a[i - 1] if i > 0 else float("-inf")
        a_right = a[i] if i < n else float("inf")
        b_left = b[j - 1] if j > 0 else float("-inf")
        b_right = b[j] if j < m else float("inf")
        if a_left <= b_right and b_left <= a_right:
            if (n + m) % 2:
                return float(max(a_left, b_left))
            return (max(a_left, b_left) + min(a_right, b_right)) / 2
        if a_left > b_right:
            hi = i - 1
        else:
            lo = i + 1
