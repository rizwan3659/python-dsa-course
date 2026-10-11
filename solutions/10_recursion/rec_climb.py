"""Reference solution · rec-climb · Climbing Stairs

Complexity: O(n)

Approach: Fibonacci-like recurrence with memoization.

Common mistakes:
- Base cases that give climb(2) = 1.
- No memoization, so climb(60) never finishes.

Follow-up challenge: Allow steps of 1, 2 or 3.
"""


from functools import lru_cache

@lru_cache(maxsize=None)
def climb(n):
    if n <= 2:
        return n
    return climb(n - 1) + climb(n - 2)
