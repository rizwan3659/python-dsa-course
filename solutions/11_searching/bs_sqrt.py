"""Reference solution · bs-sqrt · Integer Square Root

Complexity: O(log x)

Approach: Binary search on the answer.

Common mistakes:
- Using mid * mid > x with float division.
- Returning lo instead of hi (or vice versa) after the loop.

Follow-up challenge: Compute the square root to 6 decimal places.
"""


def my_sqrt(x):
    lo, hi, ans = 0, x, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= x:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans
