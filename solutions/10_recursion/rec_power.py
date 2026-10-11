"""Reference solution · rec-power · Fast Power

Complexity: O(log n)

Approach: Halve n each call.

Common mistakes:
- Calling power(x, n // 2) twice, which makes it O(n) again.
- Forgetting the extra factor of x for odd n.

Follow-up challenge: Support negative n (return 1 / power(x, −n)).
"""


def power(x, n):
    if n == 0:
        return 1
    half = power(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x
