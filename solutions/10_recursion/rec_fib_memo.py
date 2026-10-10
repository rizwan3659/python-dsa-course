"""Reference solution · rec-fib-memo · Fibonacci With Memoization

Complexity: O(n) time

Approach: Memoization turns O(2ⁿ) into O(n).
"""


from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
