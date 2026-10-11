"""Reference solution · th-count-primes · Count Primes (Sieve of Eratosthenes)

Complexity: O(n log log n) time, O(n) space

Approach: Sieve of Eratosthenes with slice assignment for speed.

Dry run:
    n = 20
    p = 2: cross out 4, 6, 8, 10, 12, 14, 16, 18
    p = 3: cross out 9, 15 (12 and 18 already gone)
    p = 4: already crossed out;  p = 5: 25 ≥ 20, stop
    left: 2 3 5 7 11 13 17 19 → 8 primes

Common mistakes:
- Calling is_prime(k) for every k: O(n√n), far too slow for 5 × 10⁶.
- Counting primes ≤ n instead of < n.
- Starting to cross out at 2p instead of p², which is correct but does extra
  work.

Follow-up challenge: Return the primes themselves, then sieve only a range
[lo, hi] with a segmented sieve.
"""


def count_primes(n):
    if n < 3:
        return 0
    is_prime = bytearray([1]) * n          # one byte per number: compact and fast
    is_prime[0] = is_prime[1] = 0
    p = 2
    while p * p < n:
        if is_prime[p]:
            # every smaller multiple of p was already crossed out by a smaller prime
            is_prime[p * p::p] = bytes(len(range(p * p, n, p)))
        p += 1
    return sum(is_prime)
