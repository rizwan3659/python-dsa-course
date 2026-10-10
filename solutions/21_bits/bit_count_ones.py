"""Reference solution · bit-count-ones · Number of 1 Bits

Complexity: O(k) time where k is the number of set bits, O(1) space

Approach: Kernighan's trick: clear the lowest set bit until n is 0.

Common mistakes:
- Using n / 2 (float) instead of n >> 1 or n // 2.
- Looping a fixed 32 times and missing higher bits of a 64-bit value.

Follow-up challenge: Count the 1 bits of every number from 0 to n in O(n)
(bit-counting-bits).
"""


def count_ones(n):
    count = 0
    while n:
        n &= n - 1        # clear the lowest set bit
        count += 1
    return count
