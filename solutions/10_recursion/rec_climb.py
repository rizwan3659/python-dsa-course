"""Reference solution · rec-climb · Climbing Stairs

Complexity: O(n)

Approach: Fibonacci-like recurrence with memoization.
"""


from functools import lru_cache

@lru_cache(maxsize=None)
def climb(n):
    if n <= 2:
        return n
    return climb(n - 1) + climb(n - 2)
