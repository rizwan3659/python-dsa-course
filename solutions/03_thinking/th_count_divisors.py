"""Reference solution · th-count-divisors · Count Divisors

Complexity: O(√n) time, O(1) space

Approach: Walk d up to √n and count both members of each divisor pair.

Dry run:
    n = 36: d=1 (1, 36) +2, d=2 (2, 18) +2, d=3 (3, 12) +2,
            d=4 (4, 9) +2, d=5 no, d=6 (6, 6) +1 → 9

Common mistakes:
- Counting a perfect square’s root twice.
- Looping all the way to n.

Follow-up challenge: Return the divisors themselves in increasing order,
still in O(√n) plus sorting.
"""


def count_divisors(n):
    count = 0
    d = 1
    while d * d <= n:
        if n % d == 0:
            count += 1 if d * d == n else 2   # d and n // d
        d += 1
    return count
