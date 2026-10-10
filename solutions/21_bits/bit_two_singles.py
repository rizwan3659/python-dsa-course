"""Reference solution · bit-two-singles · Two Single Numbers

Complexity: O(n) time, O(1) space

Approach: XOR all, isolate the lowest differing bit with x & −x, then XOR
each half separately.

Common mistakes:
- Using a set: correct but O(n) space.
- Isolating the bit with both & 1 (that bit may be 0).

Follow-up challenge: What if three numbers appear once?
"""


def two_singles(nums):
    both = 0
    for x in nums:
        both ^= x              # = a ^ b, nonzero because a != b
    low = both & -both         # a bit where a and b differ
    a = 0
    for x in nums:
        if x & low:            # split into two groups by that bit
            a ^= x
    b = both ^ a
    return sorted([a, b])
