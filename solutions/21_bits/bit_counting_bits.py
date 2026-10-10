"""Reference solution · bit-counting-bits · Counting Bits 0..n

Complexity: O(n) time, O(n) space

Approach: DP on numbers: reuse the answer for i >> 1.

Common mistakes:
- Recounting every number from scratch: O(n log n).
- Writing bits[i // 2] + i % 2 is fine, but i / 2 is a float index.

Follow-up challenge: Use bits[i & (i − 1)] + 1 instead. Why does it work?
"""


def count_bits(n):
    bits = [0] * (n + 1)
    for i in range(1, n + 1):
        bits[i] = bits[i >> 1] + (i & 1)   # i without its lowest bit, plus that bit
    return bits
