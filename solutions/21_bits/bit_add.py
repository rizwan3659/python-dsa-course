"""Reference solution · bit-add · Add Without +

Complexity: O(number of bits) time

Approach: Ripple-carry addition with XOR and AND.

Common mistakes:
- Forgetting to shift the carry left.
- Running it on negative numbers in Python: unbounded ints never stop
  carrying (mask to 32 bits if you need negatives).

Follow-up challenge: Support negative numbers by masking to 32 bits and
converting the result back to a signed value.
"""


def add(a, b):
    while b:
        carry = (a & b) << 1    # positions where both have a 1 produce a carry
        a = a ^ b               # sum ignoring carries
        b = carry
    return a
