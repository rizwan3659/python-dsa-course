"""Reference solution · rec-fib-memo · Fibonacci With Memoization

Complexity: O(n) time

Approach: Memoization turns O(2ⁿ) into O(n).

Common mistakes:
- Creating a new memo dict inside every call (no sharing).
- Using a mutable default without understanding that it persists between
  calls.

Follow-up challenge: Write it bottom-up with two variables.
"""


from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
