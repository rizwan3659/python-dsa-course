"""Reference solution · bit-ops · Get, Set, Clear, Toggle

Complexity: O(1) each

Approach: Build the mask 1 << i and combine it with &, |, ^ or ~.

Common mistakes:
- clear_bit with n & (1 << i), which keeps only that bit.
- Returning n & (1 << i) from get_bit (that is 2ⁱ, not 1).

Follow-up challenge: Clear all bits above i, or all bits from i down to 0,
with one mask each.
"""


def get_bit(n, i):
    return (n >> i) & 1


def set_bit(n, i):
    return n | (1 << i)


def clear_bit(n, i):
    return n & ~(1 << i)


def toggle_bit(n, i):
    return n ^ (1 << i)
