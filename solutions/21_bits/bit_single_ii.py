"""Reference solution · bit-single-ii · Single Number II

Complexity: O(32 · n) time, O(1) space

Approach: Count each of the 32 bits modulo 3, rebuild the number, and fix
the sign.

Common mistakes:
- Forgetting the sign: bit 31 set means a negative number.
- XOR, which only cancels pairs.

Follow-up challenge: Do it in one pass with two bitmasks ones and twos (a
tiny state machine).
"""


def single_number_ii(nums):
    result = 0
    for i in range(32):
        ones = sum((x >> i) & 1 for x in nums)   # works for negatives: >> keeps the sign
        if ones % 3:
            result |= 1 << i
    if result >= 1 << 31:                          # bit 31 set: negative in 32-bit
        result -= 1 << 32
    return result
