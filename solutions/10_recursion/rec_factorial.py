"""Reference solution · rec-factorial · Factorial

Complexity: O(n) time, O(n) stack

Approach: n × factorial(n − 1).

Common mistakes:
- A base case of n == 1 only, which recurses forever for n = 0.
- Returning n * factorial(n) (no progress).

Follow-up challenge: Write it with a loop and compare the stack depth
needed.
"""


def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
