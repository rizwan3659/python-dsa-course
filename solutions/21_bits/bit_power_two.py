"""Reference solution · bit-power-two · Power of Two

Complexity: O(1) time and space

Approach: n > 0 and (n & (n − 1)) == 0.

Common mistakes:
- Forgetting n > 0 (0 & −1 == 0).
- Using n % 2 == 0, which is also true for 6.

Follow-up challenge: Is n a power of four? (One set bit, at an even
position: n & 0x55555555.)
"""


def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0
