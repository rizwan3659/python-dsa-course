"""Reference solution · dp-fib-memo · Fibonacci with Memoization

Complexity: O(n) time, O(n) space

Approach: Memoized recursion: each fib(k) is computed once.

Common mistakes:
- Leaving out the cache: fib(90) would take longer than the age of the
  universe.
- Wrong base cases, e.g. fib(0) = 1.

Follow-up challenge: Write it bottom-up with two variables: O(n) time and
O(1) space.
"""


from functools import lru_cache


@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
