"""Reference solution · bit-reverse · Reverse 32 Bits

Complexity: O(32) = O(1) time

Approach: 32 iterations of: shift result left, add the lowest bit of n,
shift n right.

Common mistakes:
- Stopping when n becomes 0 (leading zeros matter).
- Using bin(n)[::-1] without padding to 32 bits.

Follow-up challenge: If this is called millions of times, cache the reversal
of each byte (256 entries).
"""


def reverse_bits(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)   # move the lowest bit of n to the end of result
        n >>= 1
    return result
