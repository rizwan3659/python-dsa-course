"""rec-fib-memo · Fibonacci With Memoization
Topic 10: Recursion & Backtracking · easy · Memoization / DP · optimize

Return fib(n) (fib(0) = 0, fib(1) = 1). The starter is correct but
exponential: make it fast for n = 300.

Examples:
    fib(10)  ->  55
    fib(1)  ->  1
    fib(300) (must be fast)

Target complexity: O(n) time

Check your work:   python dsa.py test rec-fib-memo
Stuck?             python dsa.py hint rec-fib-memo
"""


def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
