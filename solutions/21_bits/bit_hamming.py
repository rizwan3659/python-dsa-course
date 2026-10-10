"""Reference solution · bit-hamming · Hamming Distance

Complexity: O(number of differing bits)

Approach: Popcount of x ^ y.

Common mistakes:
- Comparing decimal digits instead of bits.

Follow-up challenge: Sum of Hamming distances over all pairs in a list, in
O(32 · n): count ones and zeros per bit position.
"""


def hamming_distance(x, y):
    diff = x ^ y          # 1 exactly where the bits differ
    count = 0
    while diff:
        diff &= diff - 1
        count += 1
    return count
