"""Reference solution · th-is-prime · Is It Prime?

Complexity: O(√n) time, O(1) space

Approach: Trial division up to √n.

Common mistakes:
- Stopping before √n (missing 9 = 3 × 3).
- Forgetting 0, 1 and negative numbers.
- Looping up to n: correct but O(n), too slow for n = 10¹².

Follow-up challenge: List all primes below n with the Sieve of Eratosthenes
in O(n log log n).
"""


def is_prime(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True
